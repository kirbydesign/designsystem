const fs = require('fs');
const path = require('path');

function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

function getExtension(filename) {
  const ext = path.extname(filename).split('.');
  return ext[ext.length - 1];
}

const removeLeadingUnderscore = (fileName) => (fileName[0] === '_' ? fileName.slice(1) : fileName);
const ignoreBarrelFileReference = (fileName) => (fileName === 'index.scss' ? '' : fileName);
const excludeFileExtension = (fileName) => path.basename(fileName, '.scss');
const removeTrailingSlash = (string) => (string.slice(-1) === '/' ? string.slice(0, -1) : string);

function createForwardRule(filePath, packageAlias, sharedRootDir) {
  const fileNameToForward = pipe(
    removeLeadingUnderscore,
    ignoreBarrelFileReference,
    excludeFileExtension
  )(path.basename(filePath));

  const url = removeTrailingSlash(
    `${path.dirname(filePath).replace(sharedRootDir, packageAlias)}/${fileNameToForward}`
  );

  return `@forward "${url}";`;
}

function findAllFilesWithExtension(extension, directory) {
  const directoryEntries = fs.readdirSync(directory, { withFileTypes: true });

  const filesWithExtInDirectory = directoryEntries
    .filter((directoryEntry) => directoryEntry.isFile())
    .filter((directoryEntry) => getExtension(directoryEntry.name) === extension)
    .map((directoryEntry) => `${directory}/${directoryEntry.name}`);

  const filesWithExtInSubdirectories = directoryEntries
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) =>
      findAllFilesWithExtension(extension, `${directory}/${directoryEntry.name}`)
    );

  return [...filesWithExtInDirectory, ...filesWithExtInSubdirectories.flat()];
}

function createForwardScssFile({
  sourceFilePath,
  sourceRootDir,
  targetRootDir,
  packageAlias,
  sharedRootDir,
}) {
  const targetFilePath = targetRootDir + sourceFilePath.split(sourceRootDir).pop();

  const targetFileDirName = path.dirname(targetFilePath);
  if (!fs.existsSync(targetFileDirName)) {
    fs.mkdirSync(targetFileDirName, { recursive: true });
  }

  const forwardRule = createForwardRule(sourceFilePath, packageAlias, sharedRootDir);
  fs.writeFileSync(targetFilePath, forwardRule);
}

module.exports.forwardScssFiles = ({
  sourceRootDir,
  targetRootDir,
  packageAlias,
  sharedRootDir,
}) => {
  const scssFilesToForward = findAllFilesWithExtension('scss', sourceRootDir);
  scssFilesToForward.forEach((sourceFilePath) => {
    createForwardScssFile({
      sourceFilePath,
      sourceRootDir,
      targetRootDir,
      packageAlias,
      sharedRootDir,
    });
  });
};
