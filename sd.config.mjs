const MODES = ['base', 'raised', 'brand'];
const PALETTE_TIERS = ['core', 'brand-palette'];

export default {
  source: ['tokens/**/*.json'],
  hooks: {
    transforms: {
      'name/kirby': {
        type: 'name',
        transform: (token) => {
          if (MODES.includes(token.path[0])) {
            // Semantic token: strip mode segment, prefix with kirby-theme-color
            return 'kirby-theme-color-' + token.path.slice(1).join('-');
          }
          if (PALETTE_TIERS.includes(token.path[0])) {
            // Palette token: strip tier segment, prefix with kirby-color
            return 'kirby-color-' + token.path.slice(1).join('-');
          }
          return 'kirby-color-' + token.path.join('-');
        },
      },
    },
  },
  platforms: {
    css: {
      transforms: ['color/css', 'name/kirby'],
      files: [
        {
          destination: 'css/color-palette-core.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'core',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
        {
          destination: 'css/color-palette-brand.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'brand-palette',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
        ...MODES.map((mode) => ({
          destination: `css/theme-${mode}.css`,
          format: 'css/variables',
          filter: (token) => token.path[0] === mode,
          options: {
            selector: `.kirby-theme-${mode}`,
            outputReferences: true,
          },
        })),
      ],
    },
  },
};
