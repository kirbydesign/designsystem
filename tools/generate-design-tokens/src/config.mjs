import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import {
  BUILT_IN_TEMPLATE_VARIABLES,
  captureNames,
  compilePattern,
  matchesEveryPathOf,
  templateVariableNames,
} from './rules.mjs';

const TEMPLATE_FIELDS = ['variable', 'selector', 'output', 'section'];

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

/** Compiles patterns, flattens units and applies defaults; throws on the first invalid entry. */
export function validateConfig(raw) {
  if (!raw?.prefix) throw new Error('Config requires a "prefix"');
  if (!Array.isArray(raw.rules) || raw.rules.length === 0) {
    throw new Error('Config requires a non-empty "rules" array');
  }
  assertUniqueRuleIds(raw.rules);
  const rules = raw.rules.map(validateRule);
  assertEveryRuleReachable(rules);

  return {
    prefix: raw.prefix,
    units: validateUnits(raw.units),
    rules,
  };
}

function assertUniqueRuleIds(rules) {
  const seenIds = new Set();
  for (const rule of rules) {
    if (seenIds.has(rule?.id)) throw new Error(`Duplicate rule id "${rule.id}"`);
    seenIds.add(rule?.id);
  }
}

function validateRule(rule) {
  if (!rule?.id) throw new Error('Every rule requires an "id"');
  const location = `Rule ${rule.id}`;
  if (!rule.match) throw new Error(`${location} requires "match"`);

  const compiled = compilePatternAt(rule.match, location);
  if (rule.ignore) {
    assertIgnoreRuleHasNoTemplates(rule, location);
  } else {
    assertRequiredTemplates(rule, location);
    assertKnownTemplateVariables(rule, compiled, location);
  }
  return { ...rule, compiled };
}

function assertIgnoreRuleHasNoTemplates(rule, location) {
  const field = TEMPLATE_FIELDS.find((templateField) => rule[templateField] != null);
  if (field) throw new Error(`${location} is an ignore rule and must not declare "${field}"`);
}

function assertRequiredTemplates(rule, location) {
  if (!rule.variable) throw new Error(`${location} requires "variable"`);
  if (!rule.output) throw new Error(`${location} requires "output"`);
}

function assertKnownTemplateVariables(rule, compiled, location) {
  const available = new Set([...BUILT_IN_TEMPLATE_VARIABLES, ...captureNames(compiled)]);
  for (const field of TEMPLATE_FIELDS.filter((templateField) => rule[templateField] != null)) {
    const unknown = templateVariableNames(rule[field]).find((name) => !available.has(name));
    if (unknown) {
      throw new Error(
        `${location}: "${field}" uses unknown template variable "${unknown}". ` +
          `Available: ${[...available].sort().join(', ')}`
      );
    }
  }
}

function assertEveryRuleReachable(rules) {
  for (const [index, earlier] of rules.entries()) {
    const unreachable = rules
      .slice(index + 1)
      .find((later) => matchesEveryPathOf(earlier.compiled, later.compiled));
    if (unreachable) {
      throw new Error(
        `Rule "${unreachable.id}" is unreachable — "${earlier.id}" ` +
          `("${earlier.match}") matches every path it could match. ` +
          `Move the catch-all rule last in the set.`
      );
    }
  }
}

/** `{ px: { scopes: [...], paths: [...] } }` → `[{ suffix, scopes: Set, paths: [compiled] }]` */
function validateUnits(units) {
  return Object.entries(units ?? {}).map(([suffix, unitConfig]) =>
    validateUnit(suffix, unitConfig)
  );
}

function validateUnit(suffix, unitConfig) {
  const location = `units.${suffix}`;
  const scopes = unitConfig?.scopes ?? [];
  const paths = unitConfig?.paths ?? [];
  if (scopes.length === 0 && paths.length === 0) {
    throw new Error(`${location} must declare "scopes" or "paths"`);
  }
  return {
    suffix,
    scopes: new Set(scopes),
    paths: paths.map((pattern) => compilePatternAt(pattern, location)),
  };
}

function compilePatternAt(pattern, location) {
  try {
    return compilePattern(pattern);
  } catch (error) {
    throw new Error(`${location}: ${error.message}`);
  }
}
