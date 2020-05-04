const { SassToTypescriptEngine } = require('../tools/sass-to-ts/dist/sass-to-ts.engine');

const {
  projects: {
    cookbook: {
      architect: {
        build: {
          options: {
            customWebpackConfig: {
              sassToTs: { transform: filesToTransform },
            },
          },
        },
      },
    },
  },
} = require('../angular.json');

console.log('Transforming SCSS files to `*.styles.ts`:');
console.log(filesToTransform);

new SassToTypescriptEngine().transform(...filesToTransform);
