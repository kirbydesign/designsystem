'use strict';

const { exec } = require('child_process');
const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

function hasChanges(inputPaths) {
  return new Promise((resolve, reject) => {
    exec(`git diff --name-only '${inputPaths[0]}' '${inputPaths[1]}'`, (e, stdout, stderr) => {
      if (e) return reject(e);
      if (stderr) return reject(stderr);
      return resolve(stdout.length > 0);
    });
  });
}

const inputPaths = ['./libs/designsystem/src/lib/', './libs/core/src'];
hasChanges(inputPaths).then((hasChanged) => {
  if (!hasChanged) return;
  const outputPaths = {
    base: './libs/designsystem/testing-base/src/lib/',
    jasmine: './libs/designsystem/testing-jasmine/src/lib/',
    jest: './libs/designsystem/testing-jest/src/lib/',
  };
  const subFolder = '/components/';
  new GenerateMocks().renderMocks(inputPaths[0], outputPaths, subFolder);
});
