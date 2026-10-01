/**
 * Kirby design-token pipeline config.
 *
 * See tools/generate-design-tokens/README.md for the config reference.
 */

export default {
  prefix: 'kirby',
  units: {
    px: {
      scopes: ['WIDTH_HEIGHT', 'GAP', 'CORNER_RADIUS', 'FONT_SIZE', 'LINE_HEIGHT', 'STROKE_FLOAT'],
      paths: ['* surface/elevation/**', 'background-blur/**'],
    },
    '%': { scopes: ['OPACITY', 'COLOR_OPACITY'] },
  },

  rules: [
    { id: 'ignore-font-size', match: 'font-size/**', ignore: true },
    { id: 'ignore-line-height', match: 'line-height/**', ignore: true },
    { id: 'ignore-font-weight', match: 'font/weight/**', ignore: true },
    { id: 'ignore-chart', match: '* surface/chart/color/**', ignore: true },
    {
      id: 'surface-base',
      match: 'base surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: ':root, .{prefix}-surface-base',
      output: 'surfaces.css',
      section: '{category}',
    },
    {
      id: 'surface',
      match: '{surface} surface/{category}/**',
      variable: '{prefix}-{category}-{rest}',
      selector: '.{prefix}-surface-{surface}',
      output: 'surfaces.css',
      section: '{category}',
    },
    {
      id: 'font',
      match: 'font/**',
      variable: '{prefix}-font-{rest}',
      output: 'surfaces.css',
      section: 'font',
    },
    {
      id: 'primitive-color',
      match: '{category}/color/**',
      variable: '{prefix}-{path}',
      output: 'primitives-color.css',
      section: '{category} colors',
    },
    {
      id: 'primitive',
      match: '{category}/**',
      variable: '{prefix}-{path}',
      output: 'primitives.css',
      section: '{category}',
    },
  ],
};
