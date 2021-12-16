const fs = require('fs');
const path = require('path');

function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

function getExtension(filename) {
  const ext = path.extname(filename).split('.');
  return ext[ext.length - 1];
}

function createForwardRule(filePath, packageAlias, sharedRootDir) {
  return pipe(
    (fileName) => (fileName[0] === '_' ? fileName.slice(1) : fileName),
    (fileName) => (fileName === 'index.scss' ? '' : fileName),
    (fileName) => path.basename(fileName, '.scss'),
    (fileName) => `~${path.dirname(filePath).replace(sharedRootDir, packageAlias)}/${fileName}`,
    (url) => (url[url.length - 1] === '/' ? url.slice(0, -1) : url),
    (url) => `@forward "${url}";`
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

function createForwardScssFile(
  sourceFilePath,
  sourceRootDir,
  targetRootDir,
  packageAlias,
  sharedRootDir
) {
  const targetFilePath = targetRootDir + sourceFilePath.split(sourceRootDir).pop();

  const targetFileDirName = path.dirname(targetFilePath);
  if (!fs.existsSync(targetFileDirName)) {
    fs.mkdirSync(targetFileDirName, { recursive: true });
  }

  const forwardRule = createForwardRule(sourceFilePath, packageAlias, sharedRootDir);
  fs.writeFileSync(targetFilePath, forwardRule);
}

// --- Main --- //
const PROJECT_LIBS_FOLDER = 'libs';
const PACKAGE_ALIAS = '@kirbydesign';
const SOURCE_ROOT_DIR = 'libs/core/scss';
const TARGET_ROOT_DIR = 'libs/designsystem/src/lib/scss';

module.exports.forwardScssFiles = (sourceRootDir, targetRootDir, packageAlias, sharedRootDir) => {
  const scssFilesToForward = findAllFilesWithExtension('scss', sourceRootDir);
  scssFilesToForward.forEach((scssFilePath) => {
    createForwardScssFile(scssFilePath, sourceRootDir, targetRootDir, packageAlias, sharedRootDir);
  });
};

//forwardScssFiles(SOURCE_ROOT_DIR, TARGET_ROOT_DIR, PACKAGE_ALIAS, PROJECT_LIBS_FOLDER);
