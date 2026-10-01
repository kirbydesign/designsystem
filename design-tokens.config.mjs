/**
 * Kirby design-token pipeline config.
 *
 * See tools/generate-design-tokens/README.md for the config reference.
 */

const PREFIX = 'kirby';
const SURFACES = ['base', 'raised', 'brand'];

export default {
  ignore: ['font-size/**', 'line-height/**', 'font/weight/**', '* surface/chart/color/**'],

  variableName: ([group, ...rest]) =>
    group.endsWith(' surface') ? [PREFIX, ...rest] : [PREFIX, group, ...rest],

  /**
   * Output files and their blocks. Each token goes to the FIRST block whose `include`
   * matches it, in the order written here, so put specific blocks before catch-alls.
   */
  outputs: {
    'surfaces.css': [
      { include: ['font/**'], section: 'font' },
      ...SURFACES.map((surface) => ({
        include: [`${surface} surface/**`],
        selector:
          surface === 'base' ? `:root, .${PREFIX}-surface-base` : `.${PREFIX}-surface-${surface}`,
        section: ([, category]) => category.toLowerCase(),
      })),
    ],
    'primitives-color.css': [
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
