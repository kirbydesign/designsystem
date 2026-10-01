export function isTokenNode(candidate) {
  return isObject(candidate) && '$type' in candidate && '$value' in candidate;
}

export function tokenKey(path) {
  return path.join('/');
}

/** @returns {Array<{ path: string[], node: object }>} */
export function collectLeafTokens(tree, path = []) {
  if (isTokenNode(tree)) return [{ path, node: tree }];
  if (!isObject(tree)) return [];
  return Object.entries(tree)
    .filter(([key]) => !isDtcgProperty(key))
    .flatMap(([key, child]) => collectLeafTokens(child, [...path, key]));
}

export function setNestedValue(tree, path, value) {
  let group = tree;
  for (const key of path.slice(0, -1)) {
    if (!Object.hasOwn(group, key)) group[key] = {};
    group = group[key];
  }
  group[path.at(-1)] = value;
}

function isObject(candidate) {
  return candidate != null && typeof candidate === 'object';
}

function isDtcgProperty(key) {
  return key.startsWith('$');
}
