import { existsSync, readFileSync } from 'node:fs';

export function readJson(label, filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function isTokenNode(candidate) {
  return isObject(candidate) && '$type' in candidate && '$value' in candidate;
}

export function tokenKey(path) {
  return path.join('/');
}

const DTCG_REFERENCE = /\{([^{}]+)\}/g;

/** Token keys referenced by a DTCG `$value`, e.g. `'{spacing.s}'` → `['spacing/s']`. */
export function referencedTokenKeys(value) {
  if (typeof value !== 'string') return [];
  return [...value.matchAll(DTCG_REFERENCE)].map(([, reference]) => reference.replaceAll('.', '/'));
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
