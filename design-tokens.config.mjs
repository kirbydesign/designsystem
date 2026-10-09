/**
 * Kirby design-token pipeline config.
 *
 * See tools/generate-design-tokens/README.md for the config reference.
 */

const PREFIX = 'kirby';
const SURFACES = ['base', 'raised', 'brand'];

export default {
  /* Ignore Figma variables that still needs work (in Figma or code) to be usable */
  ignore: [
    'font-size/**',
    'font/weight/**',
    'line-height/**',
    '* surface/chart/color/**',
    'loudness-scale/**',
    'component/**',
    'stroke/**',
    'transparency/**',
    'background-blur/**',
    '* surface/elevation/**',
    '* surface/tooltip/**',
  ],

  variableName: ([group, ...rest]) =>
    group.endsWith(' surface') ? [PREFIX, ...rest] : [PREFIX, group, ...rest],

  /**
   * Output files and their blocks. Each token goes to the FIRST block whose `include`
   * matches it, in the order written here, so put specific blocks before catch-alls.
   */
  outputs: {
    'default-brand.css': [
      ...SURFACES.map((surface) => ({
        include: [`${surface} surface/**`],
        selector:
          surface === 'base' ? `:root, .${PREFIX}-surface-base` : `.${PREFIX}-surface-${surface}`,
        section: ([, category]) => category.toLowerCase(),
      })),
    ],
    'color-primitives.css': [
      { include: ['*/color/**'], section: ([group]) => `${group.toLowerCase()} colors` },
    ],
    'primitives.css': [{ include: ['**'], section: ([group]) => group.toLowerCase() }],
  },

  units: {
    px: {
      scopes: ['WIDTH_HEIGHT', 'GAP', 'CORNER_RADIUS', 'FONT_SIZE', 'LINE_HEIGHT', 'STROKE_FLOAT'],
      include: ['* surface/elevation/**', 'background-blur/**'],
    },
    '%': { scopes: ['OPACITY', 'COLOR_OPACITY'] },
  },
};
