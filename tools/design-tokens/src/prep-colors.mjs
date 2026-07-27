/**
 * Color prep for Figma exports (ADR-001).
 *
 * The Figma structure dictates the output. Each color primitive collection
 * (`system`, `brand`, …) is a self-describing tree whose leaf paths are also
 * the variable names semantic tokens alias to. So resolution is pure
 * membership: a semantic alias whose `targetVariableName` matches a primitive
 * leaf path becomes a DTCG `{reference}`; anything else keeps its literal
 * color value.
 *
 * This removes every hardcoded Figma collection display name and palette-tier
 * assumption from the previous pipeline. What stays is the irreducible work:
 *
 * - map Figma `com.figma.aliasData` to DTCG `{reference}` syntax by membership
 * - compute override deltas (only tokens that differ from the default)
 *
 * Returns in-memory token objects — no intermediate files are written.
 */

import { collectLeafTokens, setNestedValue } from './tokens.mjs';

/** Surface modes in the semantic token files. */
const SURFACES = ['base', 'raised', 'brand'];

/**
 * Merges color primitive files into one clean token tree, preserving each
 * leaf's full Figma path. Values remain full Figma color objects so the SD
 * `value/hex` transform can extract hex at build time.
 *
 * @param {object[]} colorData - raw Figma color exports (e.g. { system: { color: … } })
 * @returns {object} merged tree, e.g. { system: { color: … }, brand: { color: … } }
 */
export function prepColorPrimitives(colorData) {
  const tree = {};
  for (const data of colorData) {
    for (const { path, node } of collectLeafTokens(data)) {
      if (node.$type !== 'color') continue;
      setNestedValue(tree, path, { $type: 'color', $value: node.$value });
    }
  }
  return tree;
}

/**
 * Builds a membership map from a color primitive tree: every leaf's Figma
 * variable name (`system/color/green/100`) maps to its DTCG reference
 * (`{system.color.green.100}`).
 *
 * @param {object} colorTree - output of prepColorPrimitives
 * @returns {Map<string, string>}
 */
export function buildMembershipMap(colorTree) {
  const map = new Map();
  for (const { path } of collectLeafTokens(colorTree)) {
    map.set(path.join('/'), `{${path.join('.')}}`);
  }
  return map;
}

/**
 * Resolves a Figma alias to a DTCG reference via the membership map, or null
 * when the target isn't one of the emitted color primitives.
 */
function resolveAlias(aliasData, membership) {
  const target = aliasData?.targetVariableName;
  if (!target) return null;
  return membership.get(target) ?? null;
}

/**
 * Reads the comparable/scalar form of a color value for delta comparison.
 * A reference wins; otherwise the hex string (extracted only for comparison).
 */
function comparableValue(node, ref) {
  if (ref) return ref;
  return node.$value?.hex ?? node.$value;
}

/**
 * Reads the output form of a color value. A reference wins; otherwise the
 * full Figma color object is preserved so `value/hex` can extract hex later.
 */
function outputValue(node, ref) {
  return ref ?? node.$value;
}

/**
 * Prepares default semantic color tokens. Each surface gets its FULL token set
 * with membership-resolved DTCG references (or a full color object when the
 * alias points outside the emitted primitives).
 *
 * @param {object} semanticData - default semantic export
 * @param {Map<string, string>} membership - from buildMembershipMap
 * @returns {object} { base: {...}, raised: {...}, brand: {...} }
 */
export function prepSemantic(semanticData, membership) {
  const result = {};

  for (const surface of SURFACES) {
    if (!semanticData[surface]) continue;

    for (const { path, node } of collectLeafTokens(semanticData[surface])) {
      if (node.$type !== 'color') continue;

      const aliasData = node.$extensions?.['com.figma.aliasData'];
      const ref = resolveAlias(aliasData, membership);

      setNestedValue(result, [surface, ...path], {
        $type: 'color',
        $value: outputValue(node, ref),
      });
    }
  }

  return result;
}

/**
 * Prepares override semantic tokens as a DELTA against the default.
 *
 * Two-pass approach:
 * 1. Keep only tokens marked `com.figma.isOverride: true`.
 * 2. Compare membership-resolved references/hex — include only when it differs
 *    from the default.
 *
 * @param {object} overrideSemanticData - external theme semantic export
 * @param {object} defaultSemanticData - default semantic export (raw Figma)
 * @param {Map<string, string>} membership - from buildMembershipMap
 * @returns {{ tokens: object, stats: { total: number, overrides: number, included: number } }}
 */
export function prepSemanticOverrideDelta(overrideSemanticData, defaultSemanticData, membership) {
  const result = {};
  const stats = { total: 0, overrides: 0, included: 0 };

  for (const surface of SURFACES) {
    if (!overrideSemanticData[surface]) continue;

    const defaultRefMap = new Map();
    if (defaultSemanticData[surface]) {
      for (const { path, node } of collectLeafTokens(defaultSemanticData[surface])) {
        if (node.$type !== 'color') continue;
        const aliasData = node.$extensions?.['com.figma.aliasData'];
        const ref = resolveAlias(aliasData, membership);
        defaultRefMap.set(path.join('.'), comparableValue(node, ref));
      }
    }

    for (const { path, node } of collectLeafTokens(overrideSemanticData[surface])) {
      if (node.$type !== 'color') continue;
      stats.total++;

      const isOverride = node.$extensions?.['com.figma.isOverride'] === true;
      if (!isOverride) continue;
      stats.overrides++;

      const aliasData = node.$extensions?.['com.figma.aliasData'];
      const ref = resolveAlias(aliasData, membership);

      const key = path.join('.');
      if (defaultRefMap.get(key) === comparableValue(node, ref)) continue;

      stats.included++;
      setNestedValue(result, [surface, ...path], {
        $type: 'color',
        $value: outputValue(node, ref),
      });
    }
  }

  return { tokens: result, stats };
}
