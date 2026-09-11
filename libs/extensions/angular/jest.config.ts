import { pathsToModuleNameMapper } from 'ts-jest';
import json from '../../../tsconfig.base.json' with { type: 'json' };

const esModules = [
  '@stencil/core',
  '@ionic/core',
  '@ionic/angular',
  'ionicons',
  '@angular/common/locales',
  'inputmask',
].join('|');

// nx doesn't allow importing tsconfig.json: https://github.com/nrwl/nx/issues/14888
// Use require instead:

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

export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules}|.*\\.mjs$)`],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(pathAliases, { prefix: '<rootDir>/' }),
    '^ionicons/(.*)$': '<rootDir>/../../../node_modules/ionicons/$1',
  },
};
