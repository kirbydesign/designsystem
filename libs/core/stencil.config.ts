import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'kirby',
  srcDir: './src/',
  plugins: [sass()],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@kirbydesign/core',
      directivesProxyFile: '../designsystem/src/lib/components/web-component-proxies.component.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    { type: 'docs-readme' },
    { type: 'docs-json', file: './custom-elements.json' },
  ],
};
