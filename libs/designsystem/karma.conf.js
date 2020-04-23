// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf');

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/libs/designsystem'),
    },
    junitReporter: {
      outputDir: require('path').join(__dirname, '../../test-reports'),
    },
    reporters: ['kjhtml', 'junit', 'spec'],
    files: [
      {
        pattern: './src/lib/icons/svg/*.svg',
        type: 'dom',
        watched: false,
        include: false,
        served: true,
        nocache: false,
      },
    ],
    proxies: {
      '/assets/kirby/icons/svg/': '/base/src/lib/icons/svg/',
    },
  });
};
