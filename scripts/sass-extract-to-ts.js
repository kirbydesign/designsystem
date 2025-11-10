import { SassToTypescriptEngine } from '../tools/sass-to-ts/dist/sass-to-ts.engine.js';

// Configuration for SCSS to TypeScript transformation
const filesToTransform = [
  'libs/core/src/helpers/color-helper.scss',
  'libs/core/src/helpers/design-token-helper.scss',
];

console.log('Transforming SCSS files to `*.styles.ts`:');
console.log(filesToTransform);

new SassToTypescriptEngine().transform(...filesToTransform);
