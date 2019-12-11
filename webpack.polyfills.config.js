const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const config = {
    mode: 'production',
    entry: {
      'resize-observer-polyfill': './src/polyfills/resize-observer-polyfill.js',
      'resize-observer-polyfill-loader': './src/polyfills/resize-observer-polyfill-loader',
      'intersection-observer-polyfill': './src/polyfills/intersection-observer-polyfill.js',
      'intersection-observer-polyfill-loader': './src/polyfills/intersection-observer-polyfill-loader',
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'src/kirby/polyfills/'),
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './src/polyfills/resize-observer-polyfill-loader.js' },
        { from: './src/polyfills/intersection-observer-polyfill-loader.js' }
      ]),
    ],
  };

  return config;
};
