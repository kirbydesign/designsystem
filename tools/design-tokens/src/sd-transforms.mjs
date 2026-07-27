/**
 * Style Dictionary hooks for the Kirby token pipeline.
 *
 * Transforms are prefix-aware: `createTransforms(prefix)` returns the name/value
 * transforms bound to the configured prefix, so the same pipeline can emit
 * `--kirby-*` or any other namespace. Filters and the `value/hex` transform are
 * prefix-agnostic and exported directly.
 */

// --- Value transforms (prefix-agnostic) ---

/**
 * Extracts the hex string from a Figma color object (ADR-001).
 * Only fires for object values carrying a `hex` field; references and plain
 * strings pass through untouched. Runs before `color/css`, which then
 * normalizes the hex (e.g. lowercasing).
 */
export const valueHex = {
  name: 'value/hex',
  type: 'value',
  transitive: false,
  filter: (token) =>
    token.$value != null && typeof token.$value === 'object' && 'hex' in token.$value,
  transform: (token) => token.$value.hex,
};

/**
 * Appends `px` to raw numeric values that Figma scopes as a dimension
 * (widths, gaps, corner radii, font sizes, line heights). Numbers scoped as
 * `FONT_STYLE`/`ALL_SCOPES` (e.g. font-weight, loudness) stay unitless.
 * References keep their `var()` form; strings (e.g. `italic`) are untouched.
 *
 * Driving units from Figma's own scopes keeps the tool structure-driven — it
 * never hardcodes collection names.
 */
const DIMENSION_SCOPES = new Set([
  'WIDTH_HEIGHT',
  'GAP',
  'CORNER_RADIUS',
  'FONT_SIZE',
  'LINE_HEIGHT',
]);

export const valuePxUnit = {
  name: 'value/px',
  type: 'value',
  filter: (token) => {
    if (typeof token.original.$value !== 'number') return false;
    const scopes = token.original.$extensions?.['com.figma.scopes'] ?? [];
    return scopes.some((scope) => DIMENSION_SCOPES.has(scope));
  },
  transform: (token) => `${token.$value}px`,
};

// --- Prefix-aware transforms ---

/**
 * Builds the name transforms bound to `prefix`.
 *
 * @param {string} prefix - namespace prefix, e.g. `kirby`
 * @returns {{ namePrimitive: object, nameColor: object, nameSemantic: object }}
 */
export function createTransforms(prefix) {
  const SURFACE_MODES = ['base', 'raised', 'brand'];

  /**
   * Primitive spacing/border-radius/font-weight names. The collection key
   * already carries the prefix (from the extractor), so this just joins the path.
   * ['kirby-spacing', 's'] -> 'kirby-spacing-s'
   */
  const namePrimitive = {
    name: 'name/primitive',
    type: 'name',
    transform: (token) => token.path.join('-'),
  };

  /**
   * Color primitive names: prefix + the full Figma path. The Figma structure
   * dictates the custom property directly — no tier renaming or path slicing.
   * ['system', 'color', 'green', '100'] -> 'kirby-system-color-green-100'
   * ['brand', 'color', 'dark-blue', '950'] -> 'kirby-brand-color-dark-blue-950'
   */
  const nameColor = {
    name: 'name/color',
    type: 'name',
    transform: (token) => `${prefix}-` + token.path.join('-'),
  };

  /**
   * Semantic names: surface tokens (base/raised/brand) become
   * `${prefix}-theme-color-*` with the surface dropped (it is encoded in the
   * selector). The color primitives — included only so references resolve —
   * keep their full path and become `${prefix}-*`.
   *
   * A color scope can share a name with a surface (`brand`), so the surface
   * test also requires that the token is NOT a color primitive. Color
   * primitives always carry `color` as their second path segment
   * (`brand/color/…`); semantic surface tokens carry a category (`fill`, …).
   * ['base', 'fill', 'base-default'] -> 'kirby-theme-color-fill-base-default'
   * ['brand', 'fill', 'default']     -> 'kirby-theme-color-fill-default'
   * ['brand', 'color', 'green', '500'] -> 'kirby-brand-color-green-500'
   */
  const nameSemantic = {
    name: 'name/semantic',
    type: 'name',
    transform: (token) => {
      const isSurface = SURFACE_MODES.includes(token.path[0]) && token.path[1] !== 'color';
      if (isSurface) {
        return `${prefix}-theme-color-` + token.path.slice(1).join('-');
      }
      return `${prefix}-` + token.path.join('-');
    },
  };

  return { namePrimitive, nameColor, nameSemantic };
}

// --- Filters (prefix-agnostic) ---

/** Matches tokens whose leading collection segment equals `collectionKey`. */
export const filterCollection = (collectionKey) => (token) => token.path[0] === collectionKey;

/** A chart token lives under `<surface>.chart.*`. */
export const isChartToken = (token) => token.path[1] === 'chart';

/**
 * A color primitive included only so references resolve. It carries `color`
 * at path segment 1 (`brand/color/…`), unlike semantic surface tokens which
 * carry a category (`fill`, `content`, …). This distinguishes a `brand` color
 * scope from the same-named `brand` semantic surface.
 */
export const isColorPrimitive = (token) => token.path[1] === 'color';

/** Surface filters (non-chart). Excludes merged-in color primitives. */
export const filterSurface = (surface) => (token) =>
  token.path[0] === surface && !isChartToken(token) && !isColorPrimitive(token);

/** Surface filters (chart only). */
export const filterSurfaceChart = (surface) => (token) =>
  token.path[0] === surface && isChartToken(token);
