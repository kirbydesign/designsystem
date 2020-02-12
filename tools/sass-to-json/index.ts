const sassExtract = require('sass-extract');
const fs = require('fs').promises;
const exists = require('fs').existsSync;
const path = require('path');

/**
 * Traverses a path (directory) recursively to find files using a filter (or all files if filter is omitted).
 * @param dir the directory to traverse for finding files
 * @param filter the (optional) filter to use for including / excluding files
 */
async function walk(dir: string, filter: (string) => boolean) {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        return walk(filePath, filter);
      } else if (stats.isFile() && filter(file)) {
        return filePath;
      }
    })
  );

  return files
    .reduce((all, folderContents) => all.concat(folderContents), [])
    .filter((each) => !!each);
}

/**
 * Extracts global variables from SCSS file (using sass-extract npm package).
 * @param pathToFile the path to the SCSS file to extract global variables from
 */
async function extractGlobalVariables(pathToFile: string) {
  const compileOptions = { file: pathToFile };
  const extractOptions = { plugins: ['compact'] };
  let result;
  try {
    result = await sassExtract.render(compileOptions, extractOptions);
  } catch (err) {
    console.error(`Error extracting SCSS from file: ${pathToFile}`, err);
    result = { vars: { global: {} } };
  }
  const globalVariables = result.vars.global;
  return Object.keys(globalVariables).length > 0 ? globalVariables : null;
}

async function execute(rootPath: string) {
  const paths = await walk(
    rootPath,
    FileMatchers.scssFile.excluding('_global-styles.scss', '_ionic.scss')
  );
  for (const path of paths) {
    const variables = await extractGlobalVariables(path);
    const data = JSON.stringify(variables, null, 2);
    await fs.writeFile(`${path}.json`, data);
    // console.log(`${path}\n${'-'.repeat(40)}\n${data}`);
  }
}

execute(process.argv[2]);
