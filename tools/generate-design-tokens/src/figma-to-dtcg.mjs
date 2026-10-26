import {
  collectLeafTokens,
  isTokenNode,
  rootTokenKey,
  setNestedValue,
  tokenKey,
} from './tokens.mjs';
import { FIGMA_SCOPES_EXTENSION, PERCENT, unitFor } from './units.mjs';

const FIGMA_ALIAS_EXTENSION = 'com.figma.aliasData';
const DTCG_REFERENCE_PATTERN = /^\{([^{}]+)\}$/;
const FIGMA_SHADOW_PARTS = {
  x: 'offsetX',
  y: 'offsetY',
  blur: 'blur',
  spread: 'spread',
  color: 'color',
};

/** Merge Figma exports without changing their paths; adapt their values to DTCG. */
export function figmaToDtcg(inputs, config, baseline = {}, warnings = []) {
  const entries = inputs.flatMap((data) => collectLeafTokens(data));
  const importedKeys = collectValidatedTokenKeys(entries);
  const baselineTokensByKey = mapTokensByKey(collectLeafTokens(baseline));
  const isKnownToken = (key) => importedKeys.has(key) || baselineTokensByKey.has(key);

  const tokens = {};
  for (const { path, node } of entries) {
    const value = aliasAsReferenceOrLiteral(path, node, isKnownToken, warnings);
    setNestedValue(tokens, path, toDtcgToken(path, node, value, config));
  }

  retypeAliasesDimensions(tokens, baselineTokensByKey);
  combineShadowParts(tokens, config);
  return tokens;
}

function ancestorKeysOf(path) {
  const ancestorKeys = [];
  for (let length = 1; length < path.length; length++) {
    ancestorKeys.push(tokenKey(path.slice(0, length)));
  }
  return ancestorKeys;
}

function mapTokensByKey(entries) {
  return new Map(entries.map(({ path, node }) => [tokenKey(path), node]));
}

function keyToReference(key) {
  return `{${key.replaceAll('/', '.')}}`;
}

function referenceToKey(value) {
  if (typeof value !== 'string') return undefined;
  return value.match(DTCG_REFERENCE_PATTERN)?.[1].replaceAll('.', '/');
}

function collectValidatedTokenKeys(entries) {
  const tokenKeys = new Set();
  const groupKeys = new Set();
  for (const { path } of entries) {
    const key = tokenKey(path);
    if (tokenKeys.has(key)) throw new Error(`Duplicate token: ${key}`);
    tokenKeys.add(key);
    for (const groupKey of ancestorKeysOf(path)) groupKeys.add(groupKey);
  }
  assertNoTokenIsAlsoAGroup(tokenKeys, groupKeys);
  return tokenKeys;
}

function assertNoTokenIsAlsoAGroup(tokenKeys, groupKeys) {
  const conflict = [...tokenKeys].find((key) => groupKeys.has(key));
  if (conflict) throw new Error(`Token is also a group: ${conflict}`);
}

function aliasAsReferenceOrLiteral(path, node, isKnownToken, warnings) {
  const aliasTarget = node.$extensions?.[FIGMA_ALIAS_EXTENSION]?.targetVariableName;
  if (!aliasTarget) return node.$value;
  const targetKey = aliasTargetCandidates(path, aliasTarget)
    .filter((key) => key !== tokenKey(path))
    .find(isKnownToken);
  if (targetKey) return keyToReference(targetKey);

  warnings.push(
    `${tokenKey(path)}: Figma alias target "${aliasTarget}" is not present in the import or baseline; retaining its literal value.`
  );
  return node.$value;
}

/**
 * Figma names alias targets in the same collection without the mode group they're exported
 * under (e.g. `color/border/base` from `base surface/range/color/fill`), so after the exact
 * path, look the target up relative to the token's groups, nearest first.
 */
function aliasTargetCandidates(path, aliasTarget) {
  const groupKeys = ancestorKeysOf(path).reverse();
  return [aliasTarget, ...groupKeys.map((groupKey) => `${groupKey}/${aliasTarget}`)].flatMap(
    (key) => [key, rootTokenKey(key)]
  );
}

function toDtcgToken(path, node, value, config) {
  if (typeof value === 'number') return toTokenWithConfiguredUnit(path, node, value, config);
  if (isColorWithAlpha(node.$type, value)) {
    return { $type: node.$type, $value: { ...value, alpha: roundToHundredths(value.alpha) } };
  }
  return { $type: node.$type, $value: value };
}

function toTokenWithConfiguredUnit(path, node, number, config) {
  const figmaScopes = node.$extensions?.[FIGMA_SCOPES_EXTENSION] ?? [];
  const unit = unitFor(config, path, figmaScopes);
  if (!unit) return { $type: node.$type, $value: number };
  if (unit === PERCENT) {
    return {
      $type: node.$type,
      $value: number,
      $extensions: { [FIGMA_SCOPES_EXTENSION]: figmaScopes },
    };
  }
  return { $type: 'dimension', $value: { value: number, unit } };
}

function isColorWithAlpha(type, value) {
  return type === 'color' && value !== null && typeof value === 'object' && 'alpha' in value;
}

function roundToHundredths(number) {
  return Math.round(number * 100) / 100;
}

function retypeAliasesDimensions(tokens, baselineTokensByKey) {
  const entries = collectLeafTokens(tokens);
  const allTokensByKey = new Map([...baselineTokensByKey, ...mapTokensByKey(entries)]);
  for (const { node } of entries) {
    if (node.$type === 'number' && aliasChainEndsInDimension(node, allTokensByKey)) {
      node.$type = 'dimension';
    }
  }
}

function aliasChainEndsInDimension(node, tokensByKey) {
  const visited = new Set();
  let current = node;
  while (current && !visited.has(current)) {
    if (current.$type === 'dimension') return true;
    visited.add(current);
    current = tokensByKey.get(referenceToKey(current.$value));
  }
  return false;
}

/**
 * Figma has no shadow variables, so each shadow is exported as a group of parts (`x`, `y`,
 * `blur`, `spread`, `color`), or a group of such groups for a layered shadow. Replaces the
 * groups that the config marks as shadows with a single DTCG shadow token.
 */
function combineShadowParts(group, config, path = []) {
  for (const [key, child] of Object.entries(group)) {
    if (key.startsWith('$') || !isGroup(child)) continue;
    const childPath = [...path, key];
    if (config.isShadow(childPath)) {
      group[key] = { $type: 'shadow', $value: shadowFrom(child, childPath) };
    } else {
      combineShadowParts(child, config, childPath);
    }
  }
}

function shadowFrom(group, path) {
  const layer = shadowLayerFrom(group);
  if (layer) return layer;
  const layers = childGroupsOf(group).map(shadowLayerFrom);
  if (layers.length > 0 && layers.every(Boolean)) return layers;
  throw new Error(
    `${tokenKey(path)}: a shadow must be a group of ${Object.keys(FIGMA_SHADOW_PARTS).join(', ')}, ` +
      'or a group of such groups'
  );
}

function shadowLayerFrom(group) {
  if (!isGroup(group)) return undefined;
  const parts = Object.keys(group).filter((key) => !key.startsWith('$'));
  const isLayer =
    parts.length === Object.keys(FIGMA_SHADOW_PARTS).length &&
    parts.every((part) => part in FIGMA_SHADOW_PARTS && isTokenNode(group[part]));
  if (!isLayer) return undefined;
  return Object.fromEntries(parts.map((part) => [FIGMA_SHADOW_PARTS[part], group[part].$value]));
}

function childGroupsOf(group) {
  return Object.entries(group)
    .filter(([key]) => !key.startsWith('$'))
    .map(([, child]) => child);
}

function isGroup(candidate) {
  return candidate !== null && typeof candidate === 'object' && !isTokenNode(candidate);
}
