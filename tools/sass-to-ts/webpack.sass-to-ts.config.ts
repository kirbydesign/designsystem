import { CustomWebpackBrowserSchema } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

import { SassToTsWebpackPlugin } from './sass-to-ts-webpack.plugin';

const CUSTOM_WEBPACK_CONFIG = 'customWebpackConfig';
const SASS_TO_TS_CONFIG = 'sassToTs';

export default (config: webpack.Configuration, options: CustomWebpackBrowserSchema) => {
  config.module?.rules?.push({
    resourceQuery: /raw/,
    type: 'asset/source',
  });

  const sassToTsConfig = options[CUSTOM_WEBPACK_CONFIG][SASS_TO_TS_CONFIG];
  config.plugins?.push(new SassToTsWebpackPlugin(sassToTsConfig as any));
  return config;
};
