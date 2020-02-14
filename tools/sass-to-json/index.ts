import { SassToJsonEngine } from './engine';
import { findPathOf, NodeFilesystem } from './filesystem';

import * as fs from 'fs';
import * as path from 'path';

console.log('Extracting Global SCSS-variables to JSON (.scss to .scss.json)...\n');

// Configuration
const projectRoot = findPathOf(__dirname, 'angular.json');
const globStartIndex = process.argv[0] === 'node' ? 2 : 1;

// ... determine glob patterns
let globs: string[];
if (process.argv.length >= globStartIndex) {
  const pathOfAngularJson = path.join(projectRoot, 'angular.json');
  const angularJson = JSON.parse(fs.readFileSync(pathOfAngularJson, 'utf-8'));
  globs =
    angularJson.projects.cookbook.architect.build.options.customWebpackConfig.sassToJson.sassFiles;
  console.log(`Unable to derive files (glob pattern) from CLI arguments, acquiring from angular.json instead!
Found the following patterns:

-${globs.join('\n-')}\n`);
} else {
  globs = process.argv.slice(globStartIndex);
}

// Engine and filesystem (used for processing)
const engine = new SassToJsonEngine(globs);
const fileSystem = new NodeFilesystem(projectRoot);

// Process files
console.log('Processing files...');
fileSystem
  .findFiles(globs)
  .then((files) => engine.transform(files, fileSystem))
  .then((files) => console.log(`... done, processed ${files.length} files!`));
