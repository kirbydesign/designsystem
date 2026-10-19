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
          prefix: 'cookbook',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'cookbook',
          style: 'kebab-case',
        },
      ],
    },
  },
];
