const { readdirSync } = require('fs');
const { extname } = require('path');

function getExtension(filename) {
  const ext = extname(filename).split('.');
  return ext[ext.length - 1];
}

function findAllFilesWithExtension(extension, dir) {
  const directoryEntries = readdirSync(dir, { withFileTypes: true });

  const filesWithExtInDirectory = directoryEntries
    .filter((directoryEntry) => directoryEntry.isFile())
    .filter((directoryEntry) => getExtension(directoryEntry.name) === extension)
    .map((directoryEntry) => `${dir}/${directoryEntry.name}`);

  const filesWithExtInSubdirectories = directoryEntries
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => findAllFilesWithExtension(extension, `${dir}/${directoryEntry.name}`));

  return [...filesWithExtInDirectory, ...filesWithExtInSubdirectories.flat()];
}

function createForwardScssFile(filePath) {}

const dirToSearch = './libs/core/scss';
const scssFilesToForward = findAllFilesWithExtension('scss', dirToSearch);
console.log(scssFilesToForward);
//scssFilesToForward.forEach((filePath) => createForwardScssFile(filePath));
