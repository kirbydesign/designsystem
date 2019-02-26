import { ImportDeclaration, SourceFile } from 'typescript';
import { RuleFailure, Rules, RuleWalker, IRuleMetadata } from 'tslint';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'disallow-tns-import',
    type: 'maintainability',
    description: `Ensures that no imports contain '.tns' in the path.`,
    options: null,
    optionsDescription: 'Not configurable',
    rationale: `Explicitly importing '.tns' is a no-go.`,
    typescriptOnly: false,
  };

  static readonly FAILURE_STRING = "Do not import from .tns files. Remove the '.tns' suffix.";
  static readonly DISALLOWED_IMPORTS = [".tns'", ".tns.ts'"];

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

class Walker extends RuleWalker {
  public visitImportDeclaration(importDeclaration: ImportDeclaration): void {
    const importDeclarationText: string = importDeclaration.getText();

    if (this.hasDisallowedImport(importDeclarationText)) {
      this.addFailureAt(
        importDeclaration.getStart(),
        importDeclaration.getWidth(),
        Rule.FAILURE_STRING
      );
    }
  }

  private hasDisallowedImport(importDeclarationText: string): boolean {
    return Rule.DISALLOWED_IMPORTS.some(
      (i: string): boolean => importDeclarationText.indexOf(i) !== -1
    );
  }
}
