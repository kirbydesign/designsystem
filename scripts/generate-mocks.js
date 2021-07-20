'use strict';

const { exec } = require('child_process');
const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

// We diff changes in /libs/core/src to make sure that changes to prop
// types (that unfortunately are not outputted to proxies.ts) will result
// in mock generation. In the end prop type information is fetched from the
// custom-elements.json file, but we want to keep that out of git, as it 
// is autogenerated every time core is built 
function hasChanges(inputPaths) {
  return new Promise((resolve, reject) => {
    exec(`git diff --name-only '${inputPaths.angular}' '${inputPaths.core}'`, (e, stdout, stderr) => {
      if (e) return reject(e);
      if (stderr) return reject(stderr);
      return resolve(stdout.length > 0);
    });
  });
}

const inputPaths = {
  angular: './libs/designsystem/src/lib/', 
  core: './libs/core/src'
};

hasChanges(inputPaths).then((hasChanged) => {
  if (!hasChanged) return;
  const outputPaths = {
    base: './libs/designsystem/testing-base/src/lib/',
    jasmine: './libs/designsystem/testing-jasmine/src/lib/',
    jest: './libs/designsystem/testing-jest/src/lib/',
  };
  const subFolder = '/components/';
  // core input path is not needed to generate angular mocks
  new GenerateMocks().renderMocks(inputPaths.angular, outputPaths, subFolder);
});
