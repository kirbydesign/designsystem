import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

interface EntryPoint {
  packageName: string;
  typesPath: string;
}

interface ComponentToPackageEntryMap {
  [componentName: string]: string;
}

export class DocsImportMapEngine {
  private distPackageJsonPath: string;
  private distPath: string;
  private outputPath: string;

  constructor(distPackageJsonPath: string, distPath: string, outputPath: string) {
    this.distPackageJsonPath = resolve(distPackageJsonPath);
    this.distPath = resolve(distPath);
    this.outputPath = resolve(outputPath);
  }

  /**
   * Read and parse the dist/package.json to get export entry points
   */
  private getExportEntryPoints(): EntryPoint[] {
    try {
      const packageJson = JSON.parse(readFileSync(this.distPackageJsonPath, 'utf-8'));
      const exports = packageJson.exports || {};

      const entryPoints: EntryPoint[] = [];

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
        let typesPath: string | null = null;
        if (
          typeof exportConfig === 'object' &&
          exportConfig !== null &&
          'types' in exportConfig &&
          typeof (exportConfig as { types?: string }).types === 'string'
        ) {
          typesPath = (exportConfig as { types: string }).types;
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
      throw new Error(
        `Error reading dist/package.json: ${error instanceof Error ? error.message : String(error)}\n` +
          'Make sure to build the design system first: nx build designsystem'
      );
    }
  }

  /**
   * Parse a .d.ts file to extract exported symbols
   * Looks for export statements at the end of the file
   */
  private parseTypeDefinitionFile(filePath: string): string[] {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const exports: string[] = [];

      // Match: export { Name1, Name2, Name3 };
      const namedExportRegex = /^export\s*{\s*([^}]+)\s*};?\s*$/gm;
      let match: RegExpExecArray | null;

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
      console.warn(
        `Warning: Could not read ${filePath}: ${error instanceof Error ? error.message : String(error)}`
      );
      return [];
    }
  }

  /**
   * Build the complete component-to-package mapping
   */
  private buildComponentMap(): ComponentToPackageEntryMap {
    const map: ComponentToPackageEntryMap = {};
    const entryPoints = this.getExportEntryPoints();

    console.log(`\nFound ${entryPoints.length} entry points in dist/package.json exports`);

    for (const { packageName, typesPath } of entryPoints) {
      const fullTypesPath = join(this.distPath, typesPath);
      const exports = this.parseTypeDefinitionFile(fullTypesPath);

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
   * Generate TypeScript file content with the mapping
   */
  private generateTypeScriptFile(map: ComponentToPackageEntryMap): string {
    const sortedEntries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));

    const groupedByPackage = new Map<string, string[]>();
    for (const [component, packageName] of sortedEntries) {
      if (!groupedByPackage.has(packageName)) {
        groupedByPackage.set(packageName, []);
      }
      const packageComponents = groupedByPackage.get(packageName);
      if (packageComponents) {
        packageComponents.push(component);
      }
    }

    let output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by: tools/docs-import-map/docs-import-map.engine.ts
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

export interface ComponentToPackageEntryMap {
  [componentName: string]: string;
}

export const COMPONENT_TO_PACKAGE_ENTRY_MAP: ComponentToPackageEntryMap = {
`;

    // Add entries grouped by package with comments
    const sortedPackages = Array.from(groupedByPackage.keys()).sort();

    for (let i = 0; i < sortedPackages.length; i++) {
      const packageName = sortedPackages[i];
      const components = groupedByPackage.get(packageName);
      if (components) {
        output += `  // ${packageName}\n`;
        for (const component of components) {
          output += `  ${component}: '${packageName}',\n`;
        }
        // Only add newline if not the last package
        if (i < sortedPackages.length - 1) {
          output += '\n';
        }
      }
    }

    output += '};\n';

    return output;
  }

  /**
   * Main transformation method - generates the import map file
   */
  public generate(): void {
    console.log('[docs-import-map] Generating import map from design system dist package...');

    const componentMap = this.buildComponentMap();

    console.log(`\nTotal exports mapped: ${Object.keys(componentMap).length}`);

    const fileContent = this.generateTypeScriptFile(componentMap);

    writeFileSync(this.outputPath, fileContent, 'utf-8');

    console.log(`[docs-import-map] Generated mapping file: ${this.outputPath}`);
  }

  /**
   * Get the output file path
   */
  public getOutputPath(): string {
    return this.outputPath;
  }
}
