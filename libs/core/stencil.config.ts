import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'kirby',
  plugins: [sass({ injectGlobalPaths: ['../designsystem/src/lib/scss/utils'] })],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@kirbydesign/core',
      directivesProxyFile: '../designsystem/src/lib/components/proxies.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    { type: 'docs-readme' },
    { type: 'docs-json', file: './component-docs.json' },
  ],
};
