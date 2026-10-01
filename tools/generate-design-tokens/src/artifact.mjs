import { collectLeafTokens, setNestedValue, tokenKey } from './tokens.mjs';
import { FIGMA_SCOPES_EXTENSION, isPercent, unitAppliesTo } from './dimension.mjs';

const FIGMA_ALIAS_EXTENSION = 'com.figma.aliasData';
const DTCG_REFERENCE_PATTERN = /^\{([^{}]+)\}$/;

/** Merge Figma exports without changing their paths; adapt their values to DTCG. */
export function normalize(inputs, config, baseline = {}, warnings = []) {
  const entries = inputs.flatMap((data) => collectLeafTokens(data));
  const importedKeys = collectValidatedTokenKeys(entries);
  const baselineTokensByKey = mapTokensByKey(collectLeafTokens(baseline));
  const isKnownToken = (key) => importedKeys.has(key) || baselineTokensByKey.has(key);

  const tokens = {};
  for (const { path, node } of entries) {
    const value = aliasAsReferenceOrLiteral(path, node, isKnownToken, warnings);
    setNestedValue(tokens, path, toDtcgToken(path, node, value, config.units));
  }

  retypeAliasesDimensions(tokens, baselineTokensByKey);
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
  if (isKnownToken(aliasTarget)) return keyToReference(aliasTarget);

  warnings.push(
    `${tokenKey(path)}: Figma alias target "${aliasTarget}" is not present in the import or baseline; retaining its literal value.`
  );
  return node.$value;
}

function toDtcgToken(path, node, value, units) {
  if (typeof value === 'number') return toTokenWithConfiguredUnit(path, node, value, units);
  if (isColorWithAlpha(node.$type, value)) {
    return { $type: node.$type, $value: { ...value, alpha: roundToHundredths(value.alpha) } };
  }
  return { $type: node.$type, $value: value };
}

function toTokenWithConfiguredUnit(path, node, number, units) {
  const figmaScopes = node.$extensions?.[FIGMA_SCOPES_EXTENSION] ?? [];
  const unit = units.find((candidate) => unitAppliesTo(candidate, figmaScopes, path));
  if (!unit) return { $type: node.$type, $value: number };
  if (isPercent(unit)) {
    return {
      $type: node.$type,
      $value: number,
      $extensions: { [FIGMA_SCOPES_EXTENSION]: figmaScopes },
    };
  }
  return { $type: 'dimension', $value: { value: number, unit: unit.suffix } };
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
