/**
 * Generic, structure-driven extractor for primitive tokens.
 *
 * Replaces the old `prep-specs` step (ADR-001). It makes no assumptions
 * about which collections exist: it extracts every collection handed to it and
 * applies the configured prefix to both variable names and DTCG references.
 *
 * `{spacing.xxxxs}` (restructured Figma, no prefix) becomes `{kirby-spacing.xxxxs}`,
 * which Style Dictionary later emits as `var(--kirby-spacing-xxxxs)`.
 *
 * Figma `$extensions` are preserved on the emitted tokens: Style Dictionary's
 * `css/variables` format omits them from output, but the `value/px` transform
 * reads their `com.figma.scopes` to decide which numbers carry a `px` unit.
 */

import { collectLeafTokens, setNestedValue } from './tokens.mjs';

/**
 * Normalizes a collection name into a CSS-identifier-safe slug.
 * `Component specs` -> `component-specs`; `border-radius` -> `border-radius`.
 */
export function slugCollection(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Rewrites DTCG references in a value, prefixing (and slugging) each
 * reference's leading collection segment.
 * `{spacing.xxxxs}` -> `{kirby-spacing.xxxxs}`. Non-string values pass through.
 */
export function prefixReferences(value, prefix) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    const [head, ...rest] = ref.split('.');
    const prefixedHead = `${prefix}-${slugCollection(head)}`;
    return rest.length ? `{${prefixedHead}.${rest.join('.')}}` : `{${prefixedHead}}`;
  });
}

/**
 * Extracts a set of primitive collections into a Style-Dictionary-ready tree.
 *
 * @param {Record<string, object>} collections - map of collection name -> raw Figma group
 * @param {string} prefix - variable/reference prefix (e.g. `kirby`)
 * @returns {object} DTCG tree keyed by `${prefix}-${slug(collection)}`
 *
 * @example
 * extractPrimitives({ spacing: { s: { $type: 'number', $value: 16 } } }, 'kirby')
 * // -> { 'kirby-spacing': { s: { $type: 'number', $value: 16 } } }
 */
export function extractPrimitives(collections, prefix) {
  const out = {};
  for (const [name, data] of Object.entries(collections)) {
    const collectionKey = `${prefix}-${slugCollection(name)}`;
    for (const { path, node } of collectLeafTokens(data)) {
      setNestedValue(out, [collectionKey, ...path], {
        ...node,
        $value: prefixReferences(node.$value, prefix),
      });
    }
  }
  return out;
}
