import { ImportDeclaration, SourceFile } from 'typescript';
import { RuleFailure, Rules, RuleWalker, IRuleMetadata, IOptions, Replacement } from 'tslint';
import * as ts from 'typescript';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'import-line-spacing',
    type: 'maintainability',
    description: `Ensures that import statements follows Angular Style Guide 03-06: https://angular.io/guide/styleguide#import-line-spacing`,
    options: null,
    optionsDescription: 'Not configurable',
    rationale: `The empty line separates your stuff from their stuff.`,
    typescriptOnly: false,
  };

  static readonly FAILURE_STRING_GROUPING = `Keep third party imports and application imports separate. Keep third party imports at the top.
  (Angular Style Guide 03-06: https://angular.io/guide/styleguide#import-line-spacing)`;
  static readonly FAILURE_STRING_SPACING = `Keep third party imports and application imports separate. Leave one empty line between third party imports and application imports.
  (Angular Style Guide 03-06: https://angular.io/guide/styleguide#import-line-spacing)`;

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

class Walker extends RuleWalker {
  resolvedImportDeclarations: { isExternalLibrary: boolean }[] = [];
  constructor(sourceFile: SourceFile, options: IOptions) {
    super(sourceFile, options);
  }

  private static compilerConfig = ts.parseConfigFileTextToJson(
    'tsconfig.json',
    ts.sys.readFile('tsconfig.json')
  ).config;

  private static compilerOptions = ts.convertCompilerOptionsFromJson(
    Walker.compilerConfig['compilerOptions'],
    ''
  ).options;

  public visitImportDeclaration(importDeclaration: ImportDeclaration): void {
    const resolvedImport = this.getResolvedImport(importDeclaration);
    const currentImportLineIndex = this.resolvedImportDeclarations.push(resolvedImport) - 1;
    if (resolvedImport.isExternalLibrary) {
      this.checkForGroupingFailure(importDeclaration, currentImportLineIndex);
    } else {
      this.checkForSpacingFailure(importDeclaration, currentImportLineIndex);
    }
    super.visitImportDeclaration(importDeclaration);
  }

  private checkForGroupingFailure(importDeclaration: ImportDeclaration, importLineIndex: number) {
    if (this.hasLocalImportsAbove(importLineIndex)) {
      this.addGroupingFailure(importDeclaration);
    }
  }

  private hasLocalImportsAbove(importLineIndex: number): boolean {
    return (
      this.resolvedImportDeclarations.findIndex(
        (imp, idx) => idx < importLineIndex && !imp.isExternalLibrary
      ) > -1
    );
  }

  private addGroupingFailure(importDeclaration: ImportDeclaration) {
    this.addFailureAt(
      importDeclaration.getStart(),
      importDeclaration.getWidth(),
      Rule.FAILURE_STRING_GROUPING
    );
  }

  private checkForSpacingFailure(importDeclaration: ImportDeclaration, importLineIndex: number) {
    const previousImportLineIndex = importLineIndex - 1;
    const previousImport = this.resolvedImportDeclarations[previousImportLineIndex];
    if (previousImport && previousImport.isExternalLibrary) {
      const hasLineSpacingAbove = importDeclaration.getFullText().lastIndexOf(ts.sys.newLine) > 0;
      if (!hasLineSpacingAbove) {
        this.addSpacingFailure(importDeclaration);
      }
    }
  }

  private addSpacingFailure(importDeclaration: ImportDeclaration) {
    const replacement = ts.sys.newLine + importDeclaration.getText();
    const fix = new Replacement(
      importDeclaration.getStart(),
      importDeclaration.getWidth(),
      replacement
    );
    this.addFailureAt(
      importDeclaration.getStart(),
      importDeclaration.getWidth(),
      Rule.FAILURE_STRING_SPACING,
      fix
    );
  }

  private getResolvedImport(importDeclaration: ImportDeclaration) {
    const resolvedImport = {
      isExternalLibrary: false,
    };
    const resolvedModule = this.getResolvedModule(importDeclaration);
    if (resolvedModule && resolvedModule.resolvedModule) {
      resolvedImport.isExternalLibrary = resolvedModule.resolvedModule.isExternalLibraryImport;
    }
    return resolvedImport;
  }

  private getResolvedModule(importDeclaration: ImportDeclaration) {
    const moduleName = importDeclaration.moduleSpecifier.getText().replace(/'/g, '');
    const fileName = importDeclaration.getSourceFile().fileName;
    const containingFile = moduleName.indexOf('../') > -1 ? fileName : '';
    const resolvedModule = ts.resolveModuleName(
      moduleName,
      containingFile,
      Walker.compilerOptions,
      {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
      }
    );
    return resolvedModule;
  }
}
