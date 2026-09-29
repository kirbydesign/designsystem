/**
 * The rule engine: the only thing the pipeline knows.
 */

// --- Slugging -------------------------------------------------------------
export function slug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Patterns -------------------------------------------------------------

const TAIL = '**';
const TAIL_CAPTURE = 'rest';
const PLACEHOLDER = /\{([a-z0-9_]+)\}|\*/gi;

/** Escapes regex metacharacters in a pattern's literal text. */
function escapeLiteral(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Compiles one segment pattern into `{ regex, captures }`. */
function compileSegment(segment) {
  const captures = [];
  let source = '';
  let last = 0;

  for (const match of segment.matchAll(PLACEHOLDER)) {
    source += escapeLiteral(segment.slice(last, match.index));
    source += '(.+)';
    captures.push(match[1] ?? null); // null for the uncapturing `*`
    last = match.index + match[0].length;
  }
  source += escapeLiteral(segment.slice(last));

  return { regex: new RegExp(`^${source}$`), captures };
}

/**
 * Compiles a `/`-separated path pattern.
 *
 * @param {string} pattern e.g. `{surface} surface/{category}/**`
 */
export function compilePattern(pattern) {
  const raw = String(pattern).split('/');
  const tail = raw.at(-1) === TAIL;
  const head = tail ? raw.slice(0, -1) : raw;

  if (head.includes(TAIL)) {
    throw new Error(`Invalid pattern "${pattern}": ${TAIL} must be the last segment`);
  }

  return { source: pattern, segments: head.map(compileSegment), tail };
}

/**
 * Matches a pattern against a leaf's source path.
 *
 * @returns {Record<string,string>|null} captures, or null when it does not match
 */
export function matchPattern(compiled, path) {
  const { segments, tail } = compiled;

  if (tail ? path.length <= segments.length : path.length !== segments.length) {
    return null;
  }

  const captures = {};
  for (const [i, segment] of segments.entries()) {
    const found = segment.regex.exec(path[i]);
    if (!found) return null;
    for (const [c, name] of segment.captures.entries()) {
      if (name) captures[name] = found[c + 1];
    }
  }

  if (tail) {
    captures[TAIL_CAPTURE] = path.slice(segments.length).map(slug).join('-');
  }
  return captures;
}

/** True when `path` matches any of the compiled `patterns`. */
export function matchesAny(patterns, path) {
  return patterns.some((p) => matchPattern(p, path) !== null);
}

export function captureNames(compiled) {
  const names = compiled.segments.flatMap((s) => s.captures.filter(Boolean));
  return new Set(compiled.tail ? [...names, TAIL_CAPTURE] : names);
}

// --- Templates ------------------------------------------------------------

const TEMPLATE_VAR = /\{([a-z0-9_]+)\}/gi;

export function interpolate(template, values) {
  return String(template).replace(TEMPLATE_VAR, (_, name) => {
    if (!(name in values)) {
      throw new Error(`Cannot interpolate "${template}": unknown template variable "${name}"`);
    }
    return slug(values[name]);
  });
}

// --- Resolution -----------------------------------------------------------

function patternFor(rule) {
  rule.__compiled ??= compilePattern(rule.match);
  return rule.__compiled;
}

/**
 * Resolves a leaf path against an ordered rule list. First match wins.
 *
 * @param {object[]} rules   ordered rules from one rule set
 * @param {string[]} path    the leaf's source path
 * @param {string} prefix    product namespace, exposed to templates as {prefix}
 * @returns {null
 *   | { rule: object, ignored: true }
 *   | { rule: object, variable: string, selector: string, output: string,
 *       section: string|null, outputReferences: boolean }}
 */
export function resolveRule(rules, path, prefix) {
  for (const rule of rules) {
    const captures = matchPattern(patternFor(rule), path);
    if (!captures) continue;

    if (rule.ignore) return { rule, ignored: true };

    const values = { ...captures, prefix, path: path.map(slug).join('-') };
    return {
      rule,
      variable: interpolate(rule.variable, values),
      selector: rule.selector ? interpolate(rule.selector, values) : ':root',
      output: interpolate(rule.output, values),
      section: rule.section ? interpolate(rule.section, values) : null,
      outputReferences: rule.outputReferences ?? true,
    };
  }
  return null;
}
