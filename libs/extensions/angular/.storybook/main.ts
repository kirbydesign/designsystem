import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: [
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: { transcludeMarkdown: true },
    },
  ],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },

  staticDirs: [
    { from: '../../../designsystem/icon/src/icons/svg', to: '/assets/kirby/icons/svg' },
    { from: '../../../../node_modules/ionicons/dist/ionicons/svg', to: '/svg' },
    { from: '../docs/assets', to: '/assets/images' },
  ],
};

export default config;

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed when using storybook in a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
