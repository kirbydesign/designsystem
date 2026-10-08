// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf.cjs');

module.exports = function (config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageReporter: {
      ...baseConfig.coverageReporter,
      dir: join(__dirname, '../../coverage/libs/designsystem'),
    },
    junitReporter: {
      outputDir: require('path').join(__dirname, '../../test-reports'),
    },
    reporters: ['kjhtml', 'junit', 'spec'],
    proxies: {
      '/base/assets/': '/assets/',
      '/base/media/': '/media/',
    },
  });
};
