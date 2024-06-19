import { pathsToModuleNameMapper } from 'ts-jest';

const esModules = ['@stencil/core', '@ionic/core', 'ionicons'].join('|');

// nx doesn't allow importing tsconfig.json: https://github.com/nrwl/nx/issues/14888
// Use require instead:
// eslint-disable-next-line @typescript-eslint/no-var-requires
const json = require('../../../tsconfig.base.json');

const mapDistToBarrelFile = (distFolderArray: string[]) => {
  return distFolderArray.map((distFolder) => {
    return distFolder.replace('libs/', '../../').replace('/dist', '') + '/index.ts';
  });
};

const pathAliases = Object.fromEntries(
  Object.entries<string[]>(json.compilerOptions.paths).map(([key, value]) => [
    key,
    mapDistToBarrelFile(value),
  ])
);

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules}|.*\\.mjs$)`],
  moduleNameMapper: pathsToModuleNameMapper(pathAliases, { prefix: '<rootDir>/' }),
};
