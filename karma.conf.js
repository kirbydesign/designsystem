// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');
const isDocker = require('is-docker')();

module.exports = () => {
  return {
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        flags: isDocker ? ['--no-sandbox'] : [],
      },
    },
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    browsers: isDocker || process.env.CI === 'true' ? ['ChromeCustom'] : ['Chrome'],
    singleRun: false,
    failOnEmptyTestSuite: false,
  };
};
