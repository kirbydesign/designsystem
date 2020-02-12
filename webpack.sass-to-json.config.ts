import { CustomWebpackBrowserSchema } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

import { SassToJsonWebpackPlugin } from './tools/sass-to-json/plugin';

const CUSTOM_WEBPACK_CONFIG = 'customWebpackConfig';
const SASS_TO_JSON_CONFIG = 'sassToJson';

export default (config: webpack.Configuration, options: CustomWebpackBrowserSchema) => {
  const sassToJsonConfiguration = options[CUSTOM_WEBPACK_CONFIG][SASS_TO_JSON_CONFIG];
  config.plugins.push(new SassToJsonWebpackPlugin(sassToJsonConfiguration as any));
  return config;
};
