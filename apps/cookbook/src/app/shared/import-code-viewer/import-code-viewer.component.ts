import { Component, Input, OnInit } from '@angular/core';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-import-code-viewer',
  templateUrl: './import-code-viewer.component.html',
  styleUrls: ['./import-code-viewer.component.scss'],
  imports: [CodeViewerComponent],
})
export class ImportCodeViewerComponent implements OnInit {
  @Input() imports: string | string[];

  importCode: string;

  /**
   * Mapping of component/module names to their package paths.
   * This is loaded from the generated file if available, otherwise uses inference.
   */
  private componentToPackage: Record<string, string> = {};

  ngOnInit(): void {
    this.loadComponentMap();
    this.importCode = this.generateImportCode();
  }

  /**
   * Load the component-to-package mapping from generated file.
   * Falls back to empty map if file doesn't exist (will use inference).
   */
  private loadComponentMap(): void {
    try {
      // Dynamically import the generated map
      // This allows the component to work even if the map hasn't been generated yet
      const generatedMap = require('./generated-import-map');
      this.componentToPackage = generatedMap.COMPONENT_TO_PACKAGE_MAP || {};
    } catch {
      // File doesn't exist - use inference fallback
      console.warn(
        '[ImportCodeViewer] Generated import map not found. Using name inference fallback. ' +
          'Run "node apps/cookbook/scripts/generate-import-map.js" for better accuracy.'
      );
      this.componentToPackage = {};
    }
  }

  private generateImportCode(): string {
    const imports = Array.isArray(this.imports) ? this.imports : [this.imports];

    if (imports.length === 0) {
      return '';
    }

    // Group imports by package
    const packageMap = new Map<string, string[]>();

    imports.forEach((importName) => {
      const packageName = this.getPackageName(importName);
      if (!packageMap.has(packageName)) {
        packageMap.set(packageName, []);
      }
      packageMap.get(packageName).push(importName);
    });

    // Generate import statements
    const importStatements: string[] = [];

    packageMap.forEach((components, packageName) => {
      const componentList = components.join(', ');
      importStatements.push(
        `import { ${componentList} } from '@kirbydesign/designsystem/${packageName}';`
      );
    });

    return importStatements.join('\n');
  }

  private getPackageName(componentName: string): string {
    // First check if we have a mapping (from generated file or manual)
    if (this.componentToPackage[componentName]) {
      return this.componentToPackage[componentName];
    }

    // Fallback: Try to infer from the component name
    // Remove common suffixes and convert to kebab-case
    let packageName = componentName
      .replace(/Component$/, '')
      .replace(/Module$/, '')
      .replace(/Directive$/, '')
      .replace(/Controller$/, '')
      .replace(/Config$/, '')
      .replace(/Helper$/, '')
      .replace(/Service$/, '');

    // Convert PascalCase to kebab-case
    packageName = packageName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    console.warn(
      `No mapping found for "${componentName}". Inferring package: "${packageName}". ` +
        `Run: tsx apps/cookbook/scripts/generate-import-map.ts to update the mapping.`
    );

    return packageName;
  }
}
