#!/usr/bin/env node

/**
 * Script to automatically generate component-to-package mapping
 * by scanning the @kirbydesign/designsystem packages and their exports.
 *
 * Run with: node apps/cookbook/scripts/generate-import-map.js
 * Or: npm run generate-import-map (if added to package.json)
 */

const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { join, resolve } = require('path');

const DESIGNSYSTEM_PATH = resolve(__dirname, '../libs/designsystem');
const OUTPUT_PATH = resolve(
  __dirname,
  '../apps/cookbook/src/app/shared/import-code-viewer/generated-import-map.ts'
);

console.log('Script directory:', __dirname);
console.log('Designsystem path:', DESIGNSYSTEM_PATH);
console.log('Output path:', OUTPUT_PATH);

/**
 * Get all package directories in libs/designsystem
 */
function getPackageDirectories() {
  const entries = readdirSync(DESIGNSYSTEM_PATH);
  return entries.filter((entry) => {
    const fullPath = join(DESIGNSYSTEM_PATH, entry);
    try {
      const stat = statSync(fullPath);
      // Only include directories that have a src folder (actual packages)
      if (stat.isDirectory() && entry !== 'dist' && entry !== 'node_modules') {
        const srcPath = join(fullPath, 'src');
        try {
          statSync(srcPath);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    } catch {
      return false;
    }
  });
}

/**
 * Parse a TypeScript export statement to extract exported names and paths
 */
function parseExports(content) {
  const exports = [];
  const exportStarPaths = [];

  // Match: export { ComponentName, OtherName } from './path';
  const namedExportRegex = /export\s*{([^}]+)}\s*from/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1]
      .split(',')
      .map((name) => {
        // Handle 'Name as Alias' - we want the original name
        const parts = name.trim().split(/\s+as\s+/);
        return parts[0].trim();
      })
      .filter((name) => name && !name.startsWith('*'));
    exports.push(...names);
  }

  // Match: export * from './path';
  const exportStarRegex = /export\s+\*\s+from\s+['"](\.\/[^'"]+)['"]/g;
  while ((match = exportStarRegex.exec(content)) !== null) {
    exportStarPaths.push(match[1]);
  }

  // Match: export class ClassName / export interface InterfaceName / export const ConstName
  const directExportRegex = /export\s+(?:class|interface|const|enum|type|function)\s+(\w+)/g;
  while ((match = directExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  return { exports, exportStarPaths };
}

/**
 * Recursively resolve export * statements
 */
function resolveExportStars(basePath, exportStarPaths, visited = new Set()) {
  const resolvedExports = [];

  for (const relPath of exportStarPaths) {
    // Convert relative path to absolute
    let fullPath = join(basePath, relPath);

    // Try to find the file (could be .ts, or index.ts in directory)
    const possiblePaths = [
      fullPath + '.ts',
      join(fullPath, 'index.ts'),
      fullPath + '.component.ts',
      fullPath + '.directive.ts',
      fullPath + '.service.ts',
      fullPath + '.module.ts',
    ];

    for (const tryPath of possiblePaths) {
      if (visited.has(tryPath)) {
        continue;
      }

      try {
        visited.add(tryPath);
        const content = readFileSync(tryPath, 'utf-8');
        const { exports, exportStarPaths: nestedStars } = parseExports(content);
        resolvedExports.push(...exports);

        // Recursively resolve nested export *
        if (nestedStars.length > 0) {
          const nestedDir = join(tryPath, '..');
          const nestedExports = resolveExportStars(nestedDir, nestedStars, visited);
          resolvedExports.push(...nestedExports);
        }

        break; // Found the file, move to next export *
      } catch (err) {
        // File not found, try next possible path
        continue;
      }
    }
  }

  return resolvedExports;
}

/**
 * Read public_api.ts or index.ts from a package and extract exports
 */
function getPackageExports(packageName) {
  const packagePath = join(DESIGNSYSTEM_PATH, packageName, 'src');

  const filesToCheck = ['public_api.ts', 'index.ts'];

  for (const file of filesToCheck) {
    const filePath = join(packagePath, file);
    try {
      const content = readFileSync(filePath, 'utf-8');
      const { exports, exportStarPaths } = parseExports(content);

      // Resolve any export * statements
      const resolvedExports = resolveExportStars(packagePath, exportStarPaths);

      return [...exports, ...resolvedExports];
    } catch {
      // File doesn't exist, try next
      continue;
    }
  }

  return [];
}

/**
 * Build the complete component-to-package mapping
 */
function buildComponentMap() {
  const map = {};
  const packages = getPackageDirectories();

  console.log(`Found ${packages.length} packages in libs/designsystem`);

  for (const packageName of packages) {
    const exports = getPackageExports(packageName);

    if (exports.length > 0) {
      console.log(`  ${packageName}: ${exports.length} exports`);
      for (const exportName of exports) {
        // Only include exports that look like components, modules, directives, etc.
        if (
          exportName.match(/Component$|Module$|Directive$|Controller$|Config$|Helper$|Service$/) ||
          exportName.match(/^[A-Z]/)
        ) {
          if (map[exportName] && map[exportName] !== packageName) {
            console.warn(
              `  Warning: ${exportName} exported from both ${map[exportName]} and ${packageName}`
            );
          }
          map[exportName] = packageName;
        }
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
 * Generated by: apps/cookbook/scripts/generate-import-map.js
 * Run: node apps/cookbook/scripts/generate-import-map.js
 *
 * This file contains the mapping of component/module/directive names
 * to their corresponding @kirbydesign/designsystem package paths.
 */

export interface ComponentToPackageMap {
  [componentName: string]: string;
}

export const COMPONENT_TO_PACKAGE_MAP: ComponentToPackageMap = {\n`;

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
function main() {
  console.log('Generating import map from designsystem packages...\n');

  const componentMap = buildComponentMap();

  console.log(`\nTotal exports mapped: ${Object.keys(componentMap).length}`);

  const fileContent = generateTypeScriptFile(componentMap);

  writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');

  console.log(`\nGenerated mapping file: ${OUTPUT_PATH}`);
  console.log('Done! ✨');
}

main();
