import { SassToJsonEngine, SassToTypescriptEngine } from './engine';
import { findPathOf, NodeFilesystem } from './filesystem';

// SASS-to-JSON script.
// --------------------
// Despite what the name implies, it will extract contents of SASS-files (.scss-files) to either:
//
//     1. JSON
//
// or
//
//     2. TypeScript
//
// The format will be determined by the CLI option named "format", eg.: '--format=ts' or '--format=json'.
// if option is omitted, "Typescript" is determined to be the target format.
//
// The script takes in a number of arguments, being the glob-patterns of files to match (to be processed)

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const projectRoot = findPathOf(__dirname, 'angular.json');

// CLI options and arguments
const options = process.argv
  .filter((each) => each.startsWith('--'))
  .map((option) => option.substr(2).split('='))
  .reduce((previous, keyValue) => {
    const [key, value] = keyValue;
    previous[key] = value;
    return previous;
  }, {});
const argsWithoutOptions = process.argv.filter((each) => !each.startsWith('--'));

function determineGlobs() {
  let globs: string[];
  const globStartIndex = argsWithoutOptions[0].includes('node') ? 2 : 1;
  if (argsWithoutOptions.length - 1 >= globStartIndex) {
    globs = argsWithoutOptions.slice(globStartIndex);
    console.log(
      `Processing SCSS files for the following glob-patterns:
    
- ${globs.join('\n- ')}
`
    );
  } else {
    const pathOfAngularJson = path.join(projectRoot, 'angular.json');
    const angularJson = JSON.parse(fs.readFileSync(pathOfAngularJson, 'utf-8'));
    globs =
      angularJson.projects.cookbook.architect.build.options.customWebpackConfig.sassToJson
        .sassFiles;
    console.log(`Unable to derive files (glob pattern) from CLI arguments, acquiring from angular.json instead!
Found the following patterns:

- ${globs.join('\n- ')}
`);
  }
  return globs;
}

function determineFormat() {
  const key = 'format';
  const candidates = ['ts', 'json'];
  const format = options[key];
  return candidates.includes(format) ? format : 'json';
}

const globs = determineGlobs();
const format = determineFormat();

console.log(
  `Extracting Global SCSS-variables (.scss to .${
    format === 'ts' ? 'styling.ts' : 'scss.json'
  })...\n`
);

// Engine and filesystem (used for processing)
const engine = format === 'ts' ? new SassToTypescriptEngine(globs) : new SassToJsonEngine(globs);
const fileSystem = new NodeFilesystem(projectRoot);

// Process files
console.log('Processing files...');
fileSystem
  .findFiles(globs)
  .then((files) => engine.transform(files, fileSystem))
  .then((files) => console.log(`... done, processed ${files.length} files!`));
