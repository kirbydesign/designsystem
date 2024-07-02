import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['./**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [
    { from: '../icon/src/icons/svg', to: '/assets/kirby/icons/svg' },
    { from: '../../../node_modules/ionicons/dist/ionicons/svg', to: '/svg' },
    { from: '../../../apps/cookbook/src/assets/icons', to: '/assets/icons' },
    { from: '../../../apps/cookbook/src/assets/images', to: '/assets/images' },
  ],
};

export default config;
