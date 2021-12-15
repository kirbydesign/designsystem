const fs = require('fs');
const path = require('path');

function getExtension(filename) {
  const ext = path.extname(filename).split('.');
  return ext[ext.length - 1];
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

function createForwardScssFile(sourceFilePath, rootDir, targetFilePath) {
  const newFileName = targetFilePath + sourceFilePath.split(rootDir).pop();

  const newFileFolder = path.dirname(newFileName);
  if (!fs.existsSync(newFileFolder)) {
    fs.mkdirSync(newFileFolder, { recursive: true });
  }

  const forwardLocation = sourceFilePath.replace('./libs', '@kirbydesign');
  fs.writeFileSync(newFileName, `@forward "${forwardLocation}";`);
}

// --- Main --- //

const dirToSearch = './libs/core/scss';
const scssFilesToForward = findAllFilesWithExtension('scss', dirToSearch);
scssFilesToForward.forEach((filePath) => {
  createForwardScssFile(
    filePath,
    dirToSearch,
    './libs/designsystem/scss-file-forwarding-test/scss'
  );
});
