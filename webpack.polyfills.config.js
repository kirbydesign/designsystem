const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
    const config = {
        mode: "production",
        entry: {
            'resize-observer-polyfill': './src/polyfills/resize-observer-polyfill.js',
            'resize-observer-ponyfill': './src/polyfills/resize-observer-ponyfill.js',
        },
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'src/kirby/polyfills/')
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: "./src/polyfills/resize-observer-ponyfill.js" },
            ]),
        ]
    };

    return config;
};
