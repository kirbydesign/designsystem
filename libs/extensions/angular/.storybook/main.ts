import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true },
    },
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: [
    { from: '../../../designsystem/icon/src/icons/svg', to: '/assets/kirby/icons/svg' },
    { from: '../../../../node_modules/ionicons/dist/ionicons/svg', to: '/svg' },
    { from: '../docs/assets', to: '/assets/images' },
  ],
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
