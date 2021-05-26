const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

const inputPath = './libs/designsystem/src/lib/';
const outputPaths = {
  base: './libs/designsystem/testing-base/src/lib/',
  jasmine: './libs/designsystem/testing-jasmine/src/lib/',
  jest: './libs/designsystem/testing-jest/src/lib/',
};
const subFolder = '/components/';
new GenerateMocks().renderMocks(inputPath, outputPaths, subFolder);
