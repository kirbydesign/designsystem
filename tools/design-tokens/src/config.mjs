/**
 * Config loading and validation.
 *
 * The config is the only place the pipeline's design-system vocabulary lives.
 * Everything it declares is checked here, at load time, so a typo fails the
 * build immediately with the offending rule named — rather than surfacing later
 * as a malformed custom property or a silently missing file.
 */

import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { compilePattern, captureNames } from './rules.mjs';

const DEFAULT_DELTA_FLAG = 'com.figma.isOverride';

/** Template variables every rule can use, regardless of its pattern. */
const ALWAYS_AVAILABLE = ['prefix', 'path'];

const TEMPLATE_VAR = /\{([a-z0-9_]+)\}/gi;

/**
 * Checks that every `{name}` in a template is either always available or a
 * capture the rule's own pattern produces.
 */
function assertTemplateVars(template, available, where, field) {
  for (const [, name] of String(template).matchAll(TEMPLATE_VAR)) {
    if (!available.has(name)) {
      throw new Error(
        `${where}: "${field}" uses unknown template variable "${name}". ` +
          `Available: ${[...available].sort().join(', ')}`,
      );
    }
  }
}

/** Compiles a pattern, re-throwing with the config location attached. */
function compileAt(pattern, where) {
  try {
    return compilePattern(pattern);
  } catch (err) {
    throw new Error(`${where}: ${err.message}`);
  }
}

/** Validates one rule and returns it with its compiled pattern attached. */
function validateRule(rule, setName) {
  const where = `Rule ${setName}/${rule?.id ?? '(no id)'}`;

  if (!rule?.id) throw new Error(`Rule set "${setName}": every rule requires an "id"`);
  if (!rule.match) throw new Error(`${where} requires "match"`);

  const compiled = compileAt(rule.match, where);

  if (rule.ignore) {
    for (const field of ['variable', 'selector', 'output', 'section']) {
      if (rule[field] != null) {
        throw new Error(`${where} is an ignore rule and must not declare "${field}"`);
      }
    }
    return { ...rule, compiled };
  }

  if (!rule.variable) throw new Error(`${where} requires "variable"`);
  if (!rule.output) throw new Error(`${where} requires "output"`);

  const available = new Set([...ALWAYS_AVAILABLE, ...captureNames(compiled)]);
  for (const field of ['variable', 'selector', 'output', 'section']) {
    if (rule[field] != null) assertTemplateVars(rule[field], available, where, field);
  }

  return { ...rule, compiled };
}

/**
 * Normalizes `units` into a flat, matcher-ready list.
 * `{ px: { scopes: [...], paths: [...] } }` → `[{ suffix, scopes: Set, paths: [compiled] }]`
 */
function validateUnits(units) {
  return Object.entries(units ?? {}).map(([suffix, spec]) => {
    const where = `units.${suffix}`;
    const scopes = spec?.scopes ?? [];
    const paths = spec?.paths ?? [];

    if (scopes.length === 0 && paths.length === 0) {
      throw new Error(`${where} must declare "scopes" or "paths"`);
    }
    return {
      suffix,
      scopes: new Set(scopes),
      paths: paths.map((p) => compileAt(p, where)),
    };
  });
}

/**
 * A segment pattern with no literal text — `*` or `{name}` — matches any one
 * segment. `compileSegment` renders exactly this source for both.
 */
const ANY_SEGMENT = '^(.+)$';

/** The path lengths a compiled pattern can match. */
function lengthsMatched({ segments, tail }) {
  return tail
    ? { min: segments.length + 1, max: Infinity }
    : { min: segments.length, max: segments.length };
}

/**
 * Fails when a rule can never be reached because an earlier rule in the same
 * set matches everything it could.
 *
 * Only the unambiguous case is detected: an earlier pattern built entirely
 * from wildcard segments, which matches *any* path of the right length. That
 * is the shape of a catch-all like `{group}/**`, and misplacing one is
 * uniquely dangerous — every later rule stops firing, but nothing errors,
 * because the catch-all happily produces a name for every leaf it swallows.
 */
function assertReachable(rules, setName) {
  for (const [i, earlier] of rules.entries()) {
    if (!earlier.compiled.segments.every((s) => s.regex.source === ANY_SEGMENT)) continue;

    const covers = lengthsMatched(earlier.compiled);
    for (const later of rules.slice(i + 1)) {
      const needs = lengthsMatched(later.compiled);
      if (needs.min >= covers.min && needs.max <= covers.max) {
        throw new Error(
          `Rule set "${setName}": rule "${later.id}" is unreachable — "${earlier.id}" ` +
            `("${earlier.match}") matches every path it could match. ` +
            `Move the catch-all rule last in the set.`,
        );
      }
    }
  }
}

/**
 * Validates a raw config object and returns a normalized one:
 * patterns compiled, units flattened, defaults applied.
 */
export function validateConfig(raw) {
  if (!raw?.prefix) throw new Error('Config requires a "prefix"');

  const sets = Object.entries(raw.ruleSets ?? {});
  if (sets.length === 0) throw new Error('Config requires at least one rule set');

  const ruleSets = {};
  for (const [setName, rules] of sets) {
    if (!Array.isArray(rules)) {
      throw new Error(`Rule set "${setName}" must be an array of rules`);
    }
    if (rules.length === 0) throw new Error(`Rule set "${setName}" is empty`);

    const seen = new Set();
    for (const rule of rules) {
      if (seen.has(rule?.id)) {
        throw new Error(`Rule set "${setName}": duplicate rule id "${rule.id}"`);
      }
      seen.add(rule?.id);
    }
    ruleSets[setName] = rules.map((rule) => validateRule(rule, setName));
    assertReachable(ruleSets[setName], setName);
  }

  return {
    prefix: raw.prefix,
    deltaFlag: raw.deltaFlag ?? DEFAULT_DELTA_FLAG,
    units: validateUnits(raw.units),
    ruleSets,
  };
}

/** Loads and validates a config module by path. */
export async function loadConfig(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Config file not found: ${filePath}`);
  }
  const module = await import(pathToFileURL(filePath).href);
  if (!module.default) {
    throw new Error(`Config file must have a default export: ${filePath}`);
  }
  return validateConfig(module.default);
}
