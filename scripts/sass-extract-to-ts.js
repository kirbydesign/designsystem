const { SassToTypescriptEngine } = require('../tools/sass-to-ts/dist/sass-to-ts.engine');

const {
  targets: {
        build: {
          options: {
            customWebpackConfig: {
              sassToTs: { transform: filesToTransform },
            },
          },
        },
      },
} = require('../apps/cookbook/project.json');

console.log('Transforming SCSS files to `*.styles.ts`:');
console.log(filesToTransform);

new SassToTypescriptEngine().transform(...filesToTransform);
