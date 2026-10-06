import { namedPath } from './tokens.mjs';

const TAIL_WILDCARD = '**';
const TAIL_CAPTURE_NAME = 'rest';
const PLACEHOLDER = /\{([a-z0-9_]+)\}|\*/gi;
const TEMPLATE_VARIABLE = /\{([a-z0-9_]+)\}/gi;
const ANY_TEXT = '(.+)';
const ANY_SEGMENT_SOURCE = `^${ANY_TEXT}$`;
const DEFAULT_SELECTOR = ':root';

export const BUILT_IN_TEMPLATE_VARIABLES = ['prefix', 'path'];

export function slug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugPath(path) {
  return path.map(slug).join('-');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function compileSegment(segment) {
  const captures = [];
  let source = '';
  let literalStart = 0;
  for (const placeholder of segment.matchAll(PLACEHOLDER)) {
    const [placeholderText, captureName = null] = placeholder;
    source += escapeRegExp(segment.slice(literalStart, placeholder.index)) + ANY_TEXT;
    captures.push(captureName);
    literalStart = placeholder.index + placeholderText.length;
  }
  source += escapeRegExp(segment.slice(literalStart));
  return { regex: new RegExp(`^${source}$`), captures };
}

export function compilePattern(pattern) {
  const segments = String(pattern).split('/');
  const tail = segments.at(-1) === TAIL_WILDCARD;
  const fixedSegments = tail ? segments.slice(0, -1) : segments;
  if (fixedSegments.includes(TAIL_WILDCARD)) {
    throw new Error(`Invalid pattern "${pattern}": ${TAIL_WILDCARD} must be the last segment`);
  }
  return { source: pattern, segments: fixedSegments.map(compileSegment), tail };
}

/** @returns {Record<string,string>|null} */
export function matchPattern(compiled, path) {
  if (!hasMatchableLength(compiled, path)) return null;

  const captures = {};
  for (const [index, segment] of compiled.segments.entries()) {
    const segmentCaptures = matchSegment(segment, path[index]);
    if (!segmentCaptures) return null;
    Object.assign(captures, segmentCaptures);
  }
  if (compiled.tail) {
    captures[TAIL_CAPTURE_NAME] = slugPath(path.slice(compiled.segments.length));
  }
  return captures;
}

function hasMatchableLength({ segments, tail }, path) {
  return tail ? path.length > segments.length : path.length === segments.length;
}

function matchSegment({ regex, captures }, text) {
  const found = regex.exec(text);
  if (!found) return null;

  const namedCaptures = {};
  for (const [index, name] of captures.entries()) {
    if (name) namedCaptures[name] = found[index + 1];
  }
  return namedCaptures;
}

export function matchesAny(patterns, path) {
  return patterns.some((pattern) => matchPattern(pattern, path) !== null);
}

export function captureNames(compiled) {
  const names = compiled.segments.flatMap(({ captures }) => captures.filter(Boolean));
  return new Set(compiled.tail ? [...names, TAIL_CAPTURE_NAME] : names);
}

export function matchesEveryPathOf(earlier, later) {
  if (earlier.source === later.source) return true;
  return isCatchAll(earlier) && isWithin(pathLengthRange(later), pathLengthRange(earlier));
}

function isCatchAll({ segments }) {
  return segments.every(({ regex }) => regex.source === ANY_SEGMENT_SOURCE);
}

function pathLengthRange({ segments, tail }) {
  return tail
    ? { min: segments.length + 1, max: Infinity }
    : { min: segments.length, max: segments.length };
}

function isWithin(inner, outer) {
  return inner.min >= outer.min && inner.max <= outer.max;
}

export function templateVariableNames(template) {
  return [...String(template).matchAll(TEMPLATE_VARIABLE)].map(([, name]) => name);
}

export function interpolate(template, values) {
  return String(template).replace(TEMPLATE_VARIABLE, (_, name) => {
    if (!(name in values)) {
      throw new Error(`Cannot interpolate "${template}": unknown template variable "${name}"`);
    }
    return slug(values[name]);
  });
}

function interpolateOptional(template, values, fallback) {
  return template ? interpolate(template, values) : fallback;
}

/**
 * First matching rule wins.
 * @param {Array} rules validated by `validateConfig`
 * @returns {null
 *   | { rule: object, ignored: true }
 *   | { rule: object, variable: string, selector: string, output: string,
 *       section: string|null, outputReferences: boolean }}
 */
export function resolveRule(rules, path, prefix) {
  const matchedPath = namedPath(path);
  for (const rule of rules) {
    const captures = matchPattern(rule.compiled, matchedPath);
    if (!captures) continue;
    if (rule.ignore) return { rule, ignored: true };
    return interpolateRule(rule, { ...captures, prefix, path: slugPath(matchedPath) });
  }
  return null;
}

function interpolateRule(rule, values) {
  return {
    rule,
    variable: interpolate(rule.variable, values),
    selector: interpolateOptional(rule.selector, values, DEFAULT_SELECTOR),
    output: interpolate(rule.output, values),
    section: interpolateOptional(rule.section, values, null),
    outputReferences: rule.outputReferences ?? true,
  };
}
