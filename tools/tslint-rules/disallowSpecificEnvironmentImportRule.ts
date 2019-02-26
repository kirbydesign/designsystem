import { ImportDeclaration, SourceFile } from 'typescript';
import { RuleFailure, Rules, RuleWalker, IRuleMetadata } from 'tslint';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'disallow-specific-environment-import',
    type: 'maintainability',
    description: `Ensures that no imports contain specific environment.ts file (as it's handled by Angular/webpack).`,
    options: null,
    optionsDescription: 'Not configurable',
    rationale: `Explicitly importing 'environment.mock.ts', 'environment.prod.ts' etc. is a no-go.`,
    typescriptOnly: false,
  };

  static readonly FAILURE_STRING = `Do not import from specific environment file as it's handled by Angular/webpack. Remove the suffix ('.mock' or '.prod').
*** Please note: Environment import can be simplified as: "import { environment } from '@drb-environment';"`;
  static readonly DISALLOWED_IMPORTS = [
    'environments/environment.mock',
    'environments/environment.prod',
  ];

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
