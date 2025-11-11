import { SassToTypescriptEngine } from '../tools/sass-to-ts/dist/sass-to-ts.engine.js';
import projectConfig from '../apps/cookbook/project.json' with { type: 'json' };

const plugins = projectConfig.targets.build.options.plugins;

const filesToTransform = plugins.find((plugin) => plugin.path.includes('sass-to-ts'))?.options
  .transform;

// Configuration for SCSS to TypeScript transformation
console.log('Transforming SCSS files to `*.styles.ts`:');
console.log(filesToTransform);

new SassToTypescriptEngine().transform(...filesToTransform);
