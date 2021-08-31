'use strict';

const { exec } = require('child_process');
const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

function hasChanges(inputPath) {
  return new Promise((resolve, reject) => {
    exec(`git diff --name-only '${inputPath}'`, (e, stdout, stderr) => {
      if (e) return reject(e);
      if (stderr) return reject(stderr);
      return resolve(stdout.length > 0);
    });
  });
}

const inputPath = './libs/designsystem/src/lib/';
hasChanges(inputPath).then((hasChanged) => {
  if (!hasChanged) return;
  const outputPaths = {
    base: './libs/designsystem/testing-base/src/lib/',
    jasmine: './libs/designsystem/testing-jasmine/src/lib/',
    jest: './libs/designsystem/testing-jest/src/lib/',
  };
  const subFolder = '/components/';
  new GenerateMocks().renderMocks(inputPath, outputPaths, subFolder);
});
