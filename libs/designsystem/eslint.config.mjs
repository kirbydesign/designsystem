// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import angularConfig from '@repo/eslint-config/angular.mjs';

export default [
  ...angularConfig,
  {
    files: ['**/*.ts'],

    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'kirby',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'kirby',
          style: 'kebab-case',
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
];
