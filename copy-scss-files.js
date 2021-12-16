const fs = require('fs');
const path = require('path');

// Magic strings - should be entered as function arguments
const PROJECT_LIBS_FOLDER = './libs';
const PACKAGE_ALIAS = '@kirbydesign';
const DIR_TO_SEARCH = './libs/core/scss';
const TARGET_EXTENSION = 'scss';

function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

function getExtension(filename) {
  const ext = path.extname(filename).split('.');
  return ext[ext.length - 1];
}

function createForwardRule(filePath, packageAlias, libsFolder) {
  return pipe(
    (fileName) => (fileName[0] === '_' ? fileName.slice(1) : fileName),
    (fileName) => (fileName === 'index.scss' ? '' : fileName),
    (fileName) =>
      `@forward "~${path.dirname(filePath).replace(libsFolder, packageAlias)}/${fileName}";`
  )(path.basename(filePath));
}

function findAllFilesWithExtension(extension, dir) {
  const directoryEntries = fs.readdirSync(dir, { withFileTypes: true });

  const filesWithExtInDirectory = directoryEntries
    .filter((directoryEntry) => directoryEntry.isFile())
    .filter((directoryEntry) => getExtension(directoryEntry.name) === extension)
    .map((directoryEntry) => `${dir}/${directoryEntry.name}`);

  const filesWithExtInSubdirectories = directoryEntries
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => findAllFilesWithExtension(extension, `${dir}/${directoryEntry.name}`));

  return [...filesWithExtInDirectory, ...filesWithExtInSubdirectories.flat()];
}

function createForwardScssFile(sourceFilePath, sourceRootDir, targetRootDir) {
  const targetFilePath = targetRootDir + sourceFilePath.split(sourceRootDir).pop();

  const targetFileDirName = path.dirname(targetFilePath);
  if (!fs.existsSync(targetFileDirName)) {
    fs.mkdirSync(targetFileDirName, { recursive: true });
  }

  const forwardRule = createForwardRule(sourceFilePath, PACKAGE_ALIAS, PROJECT_LIBS_FOLDER);
  fs.writeFileSync(targetFilePath, forwardRule);
}

// --- Main --- //
const scssFilesToForward = findAllFilesWithExtension(TARGET_EXTENSION, DIR_TO_SEARCH);
scssFilesToForward.forEach((filePath) => {
  createForwardScssFile(
    filePath,
    DIR_TO_SEARCH,
    './libs/designsystem/scss-file-forwarding-test/scss'
  );
});
