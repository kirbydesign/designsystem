import { CustomWebpackBrowserSchema } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

import { SassToTsWebpackPlugin } from './tools/sass-to-ts/sass-to-ts-webpack.plugin';

const CUSTOM_WEBPACK_CONFIG = 'customWebpackConfig';
const SASS_TO_TS_CONFIG = 'sassToTs';

export default (config: webpack.Configuration, options: CustomWebpackBrowserSchema) => {
  const sassToTsConfig = options[CUSTOM_WEBPACK_CONFIG][SASS_TO_TS_CONFIG];
  config.plugins.push(new SassToTsWebpackPlugin(sassToTsConfig as any));
  return config;
};
