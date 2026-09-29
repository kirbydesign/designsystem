import { collectLeafTokens, setNestedValue } from './tokens.mjs';
import { matchesAny } from './rules.mjs';

const ALIAS = 'com.figma.aliasData';
const SCOPES = 'com.figma.scopes';
const REFERENCE = /^\{([^{}]+)\}$/;
const UNSAFE_PATH_PARTS = new Set(['__proto__', 'prototype', 'constructor']);

/** Merge Figma exports without changing their paths; adapt their values to DTCG. */
export function normalize(inputs, config, baseline = {}, warnings = []) {
  const entries = inputs.flatMap((data) => collectLeafTokens(data));
  const paths = new Set();
  const groups = new Set();
  for (const { path } of entries) {
    if (path.some((part) => UNSAFE_PATH_PARTS.has(part))) {
      throw new Error(`Unsafe token path: ${path.join('/')}`);
    }
    const key = path.join('/');
    if (paths.has(key)) throw new Error(`Duplicate token: ${key}`);
    paths.add(key);
    for (let i = 1; i < path.length; i++) groups.add(path.slice(0, i).join('/'));
  }
  for (const path of paths) {
    if (groups.has(path)) throw new Error(`Token is also a group: ${path}`);
  }

  const baselineTokens = new Map(
    collectLeafTokens(baseline).map(({ path, node }) => [path.join('/'), node])
  );
  const tokens = {};
  for (const { path, node } of entries) {
    const target = node.$extensions?.[ALIAS]?.targetVariableName;
    const reference = typeof node.$value === 'string' ? node.$value.match(REFERENCE)?.[1] : null;
    let type = node.$type;
    let extensions;
    let value =
      target && (paths.has(target) || baselineTokens.has(target))
        ? `{${target.replaceAll('/', '.')}}`
        : node.$value;

    if (target && !paths.has(target) && !baselineTokens.has(target)) {
      warnings.push(
        `${path.join('/')}: Figma alias target "${target}" is not present in the import or baseline; retaining its literal value.`
      );
    }

    if (!reference && typeof value === 'number') {
      const scopes = node.$extensions?.[SCOPES] ?? [];
      const unit = config.units.find(
        ({ scopes: unitScopes, paths }) =>
          scopes.some((scope) => unitScopes.has(scope)) || matchesAny(paths, path)
      );
      if (unit) {
        if (unit.suffix !== '%') {
          type = 'dimension';
          value = { value, unit: unit.suffix };
        } else {
          extensions = { 'com.figma.scopes': scopes };
        }
      }
    } else if (type === 'color' && value && typeof value === 'object' && 'alpha' in value) {
      value = { ...value, alpha: Math.round(value.alpha * 100) / 100 };
    }
    setNestedValue(tokens, path, {
      $type: type,
      $value: value,
      ...(extensions ? { $extensions: extensions } : {}),
    });
  }

  const tokenEntries = collectLeafTokens(tokens);
  const all = new Map([
    ...baselineTokens,
    ...tokenEntries.map(({ path, node }) => [path.join('/'), node]),
  ]);
  const isDimension = (node) => {
    const visited = new Set();
    let current = node;
    while (current && !visited.has(current)) {
      if (current.$type === 'dimension') return true;
      visited.add(current);
      const target =
        typeof current.$value === 'string' ? current.$value.match(REFERENCE)?.[1] : null;
      if (!target) return false;
      current = all.get(target.replaceAll('.', '/'));
    }
    return false;
  };
  for (const { node } of tokenEntries) {
    if (node.$type === 'number' && isDimension(node)) node.$type = 'dimension';
  }
  return tokens;
}
