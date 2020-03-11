const { GenerateMocks } = require('../tools/generate-mocks/dist/generate-mocks');

const inputPath = './libs/designsystem/src/lib/';
const outputPath = './libs/designsystem/testing-base/src/lib/';
const subFolder = '/components/';
new GenerateMocks().renderMocks(inputPath, outputPath, subFolder);
