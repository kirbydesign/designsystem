// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf');

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
    files: [
      {
        pattern: './icon/src/icons/svg/*.svg',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
      {
        pattern: './testing/images/*.png',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],
    proxies: {
      '/assets/images/': '/base/testing/images/',
      '/assets/kirby/icons/svg/': '/base/icon/src/icons/svg/',
      '/svg/': '/base/src/lib/icons/svg/',
    },
  });
};
