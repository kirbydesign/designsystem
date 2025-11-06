import { Component, Input, OnInit } from '@angular/core';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-import-viewer',
  templateUrl: './import-code-viewer.component.html',
  imports: [CodeViewerComponent],
})
export class ImportViewerComponent implements OnInit {
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
      this.componentToPackage = generatedMap.COMPONENT_TO_PACKAGE_ENTRY_MAP || {};
    } catch {
      // File doesn't exist - use inference fallback
      console.warn(
        '[ImportCodeViewer] Generated import map not found.' +
          'Run "nx build designsystem && npm run generate-docs-import-map".'
      );
      this.componentToPackage = {};
    }
  }

  private generateImportCode(): string {
    const imports = Array.isArray(this.imports) ? this.imports : [this.imports];

    if (imports.length === 0) return '';

    // Group imports by package
    const packageMap = new Map<string, string[]>();

    imports.forEach((importName) => {
      const packageName = this.getPackageName(importName);
      if (!packageName) return;
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
    if (this.componentToPackage[componentName]) {
      return this.componentToPackage[componentName];
    } else {
      console.warn(
        `[ImportCodeViewer] No matching package entry found for ${componentName}. No import statement generated.`
      );
      return;
    }
  }
}
