/**
 * Shared token-tree helpers used across the pipeline.
 *
 * A "token node" is a DTCG leaf: an object with `$type` and `$value`.
 */

export function isTokenNode(obj) {
  return obj != null && typeof obj === 'object' && '$type' in obj && '$value' in obj;
}

/**
 * Recursively collects every token leaf under `obj`.
 * @returns {Array<{ path: string[], node: object }>}
 */
export function collectLeafTokens(obj, path = []) {
  const tokens = [];
  if (isTokenNode(obj)) {
    tokens.push({ path, node: obj });
    return tokens;
  }
  if (obj != null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      tokens.push(...collectLeafTokens(value, [...path, key]));
    }
  }
  return tokens;
}

/** Sets `value` at a nested `pathParts` location, creating groups as needed. */
export function setNestedValue(obj, pathParts, value) {
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];
    if (!Object.hasOwn(current, key)) current[key] = {};
    current = current[key];
  }
  current[pathParts[pathParts.length - 1]] = value;
}
