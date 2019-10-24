import { ImportDeclaration, SourceFile } from 'typescript';
import { RuleFailure, Rules, RuleWalker, IRuleMetadata } from 'tslint';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'disallow-http-client-module-import-in-specs',
    type: 'maintainability',
    description: 'Ensures that no illegal modules are imported in spec files.',
    options: null,
    optionsDescription: 'Not configurable',
    rationale: 'Importing illegal modules in spec files is a no-go.',
    typescriptOnly: false,
  };

  // tslint:disable-next-line:prettier
  static readonly FAILURE_STRING =
    'Do not import HttpClientModule in spec files. Use HttpClientTestingModule instead';
  static readonly DISALLOWED_MODULES = ['HttpClientModule'];
  static readonly FILE_EXTENSIONS_TO_APPLY_RULE_FOR = ['.spec.ts'];

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

class Walker extends RuleWalker {
  public visitImportDeclaration(importDeclaration: ImportDeclaration): void {
    const { fileName } = importDeclaration.getSourceFile();
    if (!this.shouldApplyRuleForFile(fileName)) {
      return;
    }

    const importDeclarationText: string = importDeclaration.getText();
    if (this.hasDisallowedImport(importDeclarationText)) {
      this.addFailureAt(
        importDeclaration.getStart(),
        importDeclaration.getWidth(),
        Rule.FAILURE_STRING
      );
    }
  }

  private shouldApplyRuleForFile(fileName: string): boolean {
    return Rule.FILE_EXTENSIONS_TO_APPLY_RULE_FOR.some(
      (i: string): boolean => fileName.indexOf(i) !== -1
    );
  }

  private hasDisallowedImport(importDeclarationText: string): boolean {
    return Rule.DISALLOWED_MODULES.some(
      (i: string): boolean => importDeclarationText.indexOf(i) !== -1
    );
  }
}
