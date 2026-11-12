// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: ['**/dist/'],
}, ...compat.extends('@repo/eslint-config/base.json'), ...storybook.configs["flat/recommended"], {
  files: ['libs/extensions/angular/rich-text-editor/src/public-components/rich-text-editor/rich-text-editor.component.stories.ts'],
  rules: { 'no-restricted-imports': 'off' },
}];
