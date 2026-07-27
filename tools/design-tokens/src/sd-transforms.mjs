/**
 * Style Dictionary hooks.
 *
 * All three are dumb by design: naming and unit policy were decided at load
 * time by the rule engine and written onto each leaf's `$extensions`, so these
 * only read annotations. Nothing here knows about prefixes, surfaces or
 * collections.
 */

import { ANNOTATIONS } from './resolve.mjs';

/**
 * Renders a Figma colour object as CSS.
 *
 * Only fires for object values carrying a `hex` field; references and plain
 * strings pass through untouched. Runs before `color/css`, which then
 * normalizes the result (e.g. lowercasing hex).
 *
 * This exists because SD 4.4's `color/css` emits `[object Object]` for the
 * DTCG `{ colorSpace, components, alpha, hex }` shape even with `usesDtcg`.
 *
 * `hex` alone is lossy: Figma reports it without the alpha channel, so a
 * translucent shadow or overlay would render fully opaque. Partial alpha is
 * therefore rendered from `components` as `rgba()`; fully opaque colours keep
 * the plain hex Figma provides.
 */
export const valueHex = {
  name: 'value/hex',
  type: 'value',
  transitive: false,
  filter: (token) =>
    token.$value != null && typeof token.$value === 'object' && 'hex' in token.$value,
  transform: (token) => {
    const { hex, alpha, components } = token.$value;
    if (alpha == null || alpha === 1) return hex;

    const [r, g, b] = components.map((channel) => Math.round(channel * 255));
    // Figma stores alpha at float precision (0.05999999865889549); three
    // decimals is well beyond 8-bit channel resolution and reads cleanly.
    return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`;
  },
};

/**
 * Appends the unit the rule engine assigned to this leaf, if any.
 *
 * Guarded on the *original* value being a number so that references (already
 * `var(--…)`) and strings (`italic`, a font family) are never suffixed.
 */
export const valueUnit = {
  name: 'value/unit',
  type: 'value',
  filter: (token) =>
    typeof token.original?.$value === 'number' &&
    token.original?.$extensions?.[ANNOTATIONS.UNIT] != null,
  transform: (token) => `${token.$value}${token.original.$extensions[ANNOTATIONS.UNIT]}`,
};

/**
 * The custom-property name, resolved by the rule engine at load time.
 * Style Dictionary never computes a name.
 */
export const nameFromRule = {
  name: 'name/rule',
  type: 'name',
  transform: (token) => token.original.$extensions[ANNOTATIONS.NAME],
};

/** Matches the leaves belonging to one emission (an output file + selector). */
export const filterEmission = (emissionKey) => (token) =>
  token.original?.$extensions?.[ANNOTATIONS.EMIT] === true &&
  token.original?.$extensions?.[ANNOTATIONS.EMISSION] === emissionKey;
