/**
 * Script to automatically generate component-to-package mapping information used in cookbook
 * by reading the @kirbydesign/designsystem dist/package.json exports
 * and parsing the corresponding .d.ts files for exported symbols.
 *
 * This script filters out testing packages (testing, testing-base, testing-jasmine, testing-jest)
 * as these are not typically showcased in cookbook code.
 *
 * Run with: node scripts/generate-docs-import-map.js
 */

const { readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');

const DIST_PACKAGE_JSON_PATH = resolve(__dirname, '../libs/designsystem/dist/package.json');
const DIST_PATH = resolve(__dirname, '../libs/designsystem/dist');
const OUTPUT_PATH = resolve(
  __dirname,
  '../apps/cookbook/src/app/shared/import-code-viewer/generated-import-map.ts'
);

console.log('Script directory:', __dirname);
console.log('Dist package.json path:', DIST_PACKAGE_JSON_PATH);
console.log('Output path:', OUTPUT_PATH);

/**
 * Read and parse the dist/package.json to get export entry points
 */
function getExportEntryPoints() {
  try {
    const packageJson = JSON.parse(readFileSync(DIST_PACKAGE_JSON_PATH, 'utf-8'));
    const exports = packageJson.exports || {};

    const entryPoints = [];

    for (const [exportPath, exportConfig] of Object.entries(exports)) {
      // Skip non-package exports (scss, package.json, etc.)
      if (exportPath.startsWith('./scss') || exportPath === './package.json') {
        continue;
      }

      // Skip testing packages - these are for internal testing only
      // and not typically imported in application code
      if (
        exportPath === './testing' ||
        exportPath === './testing-base' ||
        exportPath === './testing-jasmine' ||
        exportPath === './testing-jest'
      ) {
        continue;
      }

      // Extract the package name from the export path
      // e.g., "./card" -> "card"
      const packageName = exportPath.replace(/^\.\//, '');

      // Get the types file path if available
      let typesPath = null;
      if (typeof exportConfig === 'object' && exportConfig.types) {
        typesPath = exportConfig.types;
      }

      if (typesPath && packageName) {
        entryPoints.push({
          packageName,
          typesPath,
        });
      }
    }

    return entryPoints;
  } catch (error) {
    console.error('Error reading dist/package.json:', error.message);
    console.error('Make sure to build the design system first: nx build designsystem');
    process.exit(1);
  }
}

/**
 * Parse a .d.ts file to extract exported symbols
 * Looks for export statements at the end of the file
 */
function parseTypeDefinitionFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const exports = [];

    // Match: export { Name1, Name2, Name3 };
    const namedExportRegex = /^export\s*{\s*([^}]+)\s*};?\s*$/gm;
    let match;

    while ((match = namedExportRegex.exec(content)) !== null) {
      const names = match[1]
        .split(',')
        .map((name) => {
          // Handle 'Name as Alias' or 'type Name' - we want the original name
          const trimmed = name.trim();
          // Remove 'type ' prefix if present
          const withoutType = trimmed.replace(/^type\s+/, '');
          // Handle 'as' aliases
          const parts = withoutType.split(/\s+as\s+/);
          return parts[0].trim();
        })
        .filter((name) => name && !name.startsWith('*'));

      exports.push(...names);
    }

    // Also match: export type { TypeName };
    const typeExportRegex = /^export\s+type\s*{\s*([^}]+)\s*};?\s*$/gm;
    while ((match = typeExportRegex.exec(content)) !== null) {
      const names = match[1]
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name && !name.startsWith('*'));

      exports.push(...names);
    }

    return exports;
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Build the complete component-to-package mapping
 */
function buildComponentMap() {
  const map = {};
  const entryPoints = getExportEntryPoints();

  console.log(`\nFound ${entryPoints.length} entry points in dist/package.json exports`);

  for (const { packageName, typesPath } of entryPoints) {
    const fullTypesPath = join(DIST_PATH, typesPath);
    const exports = parseTypeDefinitionFile(fullTypesPath);

    if (exports.length > 0) {
      console.log(`  ${packageName}: ${exports.length} exports`);

      for (const exportName of exports) {
        // Only include exports that look like components, modules, directives, etc.
        // Filter out internal Angular symbols (starting with ɵ) and lowercase-only names
        if (
          exportName.match(/^ɵ/) || // Skip Angular internal symbols
          !exportName.match(/^[A-Z]/) // Skip lowercase-only names (likely not public API)
        ) {
          continue;
        }

        if (map[exportName] && map[exportName] !== packageName) {
          console.warn(
            `  Warning: ${exportName} exported from both ${map[exportName]} and ${packageName}`
          );
        }
        map[exportName] = packageName;
      }
    }
  }

  return map;
}

/**
 * Generate TypeScript file with the mapping
 */
function generateTypeScriptFile(map) {
  const sortedEntries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));

  const groupedByPackage = new Map();
  for (const [component, packageName] of sortedEntries) {
    if (!groupedByPackage.has(packageName)) {
      groupedByPackage.set(packageName, []);
    }
    groupedByPackage.get(packageName).push(component);
  }

  let output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by: scripts/generate-docs-import-map.js
 * Run: node scripts/generate-docs-import-map.js
 *
 * This file is generated from the built design system package.
 * Make sure to build the design system first: nx build designsystem
 *
 * Note: Testing packages (testing, testing-base, testing-jasmine, testing-jest)
 * are excluded as they are for internal use only.
 *
 * This file contains the mapping of component/module/directive names
 * to their corresponding @kirbydesign/designsystem package paths.
 */

export interface ComponentToPackageMap {
  [componentName: string]: string;
}

export const COMPONENT_TO_PACKAGE_MAP: ComponentToPackageMap = {
`;

  // Add entries grouped by package with comments
  const sortedPackages = Array.from(groupedByPackage.keys()).sort();

  for (let i = 0; i < sortedPackages.length; i++) {
    const packageName = sortedPackages[i];
    const components = groupedByPackage.get(packageName);
    output += `  // ${packageName}\n`;
    for (const component of components) {
      output += `  ${component}: '${packageName}',\n`;
    }
    // Only add newline if not the last package
    if (i < sortedPackages.length - 1) {
      output += '\n';
    }
  }

  output += '};\n';

  return output;
}

/**
 * Main function
 */
function generateDocsImportMaps() {
  console.log('Generating import map from design system dist package...\n');
  console.log('Note: This requires the design system to be built first.');
  console.log('Run: nx build designsystem\n');

  const componentMap = buildComponentMap();

  console.log(`\nTotal exports mapped: ${Object.keys(componentMap).length}`);

  const fileContent = generateTypeScriptFile(componentMap);

  writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');

  console.log(`\nGenerated mapping file: ${OUTPUT_PATH}`);
  console.log('Done! ✨');
}

generateDocsImportMaps();
