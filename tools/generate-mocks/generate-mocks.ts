import * as ts from 'typescript';
import * as prettier from 'prettier';

import { posix as path } from 'path';

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';

type ComponentMetaData = {
  className: string;
  decorator: string;
  selector: string;
  properties: any[];
};

export class GenerateMocks {
  async renderMocks(rootPath: string, outputPath: string, subPath: string) {
    const inputPath = path.join(rootPath, subPath);
    const outputPathNormalized = path.normalize(outputPath);
    const classMap = new Map<string, string[]>();
    await this.traverseFolder(inputPath, outputPathNormalized, subPath, classMap);
    await this.renderMockComponentDeclaration(classMap, outputPathNormalized);
  }

  private async renderMockComponentDeclaration(
    classMap: Map<string, string[]>,
    outputPath: string
  ) {
    const imports = Array.from(classMap.entries())
      .map((keyValue) => {
        const filepath = keyValue[0];
        const classNames = keyValue[1];
        const relativePath = filepath.replace(outputPath, './').replace('.ts', '');
        return `import { ${classNames.join(', ')} } from '${relativePath}';`;
      })
      .join('\n');
    const components = Array.from(classMap.values())
      .map((classNames) => classNames.join(',\n  '))
      .join(',\n  ');
    const filename = path.join(outputPath, '/mock-components.ts');
    const content = `${imports}

export const MOCK_COMPONENTS = [
  ${components},
];
`;
    const formatted = await this.formatWithPrettier(content);
    writeFileSync(filename, formatted);
  }

  private async traverseFolder(
    folderpath: string,
    outputPath: string,
    subPath: string,
    classMap: Map<string, string[]>
  ) {
    const folderContent = readdirSync(folderpath);
    for (const fileOrFolder of folderContent) {
      const fullPath = path.join(folderpath, fileOrFolder);
      const ent = statSync(fullPath);
      if (ent.isDirectory()) {
        await this.traverseFolder(fullPath, outputPath, subPath, classMap);
      } else {
        if (fileOrFolder.endsWith('.component.ts')) {
          // console.log('Rendering mock for: ', fullPath);
          const newFilename = path.join(outputPath, subPath, 'mock.' + fileOrFolder);
          const classNames = await this.renderMock(fullPath, newFilename);
          if (classNames) {
            classMap.set(newFilename, classNames);
          }
        }
      }
    }
  }

  private async renderMock(fileName: string, newFilename: string) {
    const components = this.generateMetaData(fileName);
    if (!components.find((metaData) => metaData.decorator)) {
      // Nothing to generate:
      return;
    }
    const rendered = [];
    const classNames = [];
    components.forEach((metaData) => {
      const mockClassName = 'Mock' + metaData.className;
      classNames.push(mockClassName);
      const classDeclaration = this.renderClass(mockClassName, metaData);
      rendered.push(classDeclaration);
    });

    const startRegion = '// #region AUTO-GENERATED';
    const endRegion = '// #endregion';
    const autoGeneratedContent = `${startRegion} - PLEASE DON'T EDIT CONTENT WITHIN!
${rendered.join('\n')}
${endRegion}
`;
    const importStatements = this.getImports(components).join('\n') + '\n\n';
    let content = importStatements + autoGeneratedContent;
    if (existsSync(newFilename)) {
      const existingContent = readFileSync(newFilename).toString();
      const regionStartIndex = existingContent.indexOf(startRegion);
      const beforeRegion = existingContent.substring(0, regionStartIndex);
      content = beforeRegion + autoGeneratedContent;
    }
    const formatted = await this.formatWithPrettier(content);
    writeFileSync(newFilename, formatted);
    return classNames;
  }

  private renderClass(className: string, componentMetaData: ComponentMetaData): string {
    const propertiesString = this.renderProperties(componentMetaData.properties);
    const validSelector =
      componentMetaData.selector &&
      (componentMetaData.selector.startsWith(`'kirby`) ||
        componentMetaData.selector.startsWith(`'[kirby`));
    const tsLintDisableSelector =
      componentMetaData.selector && !validSelector
        ? `\n  // tslint:disable-next-line: component-selector`
        : '';
    const selector = componentMetaData.selector
      ? `\n  selector: ${componentMetaData.selector},`
      : '';
    const template =
      componentMetaData.decorator === 'Component'
        ? `\n  template: '<ng-content></ng-content>',`
        : '';
    const content = `@${componentMetaData.decorator}({${tsLintDisableSelector}${selector}${template}
})
export class ${className} {${propertiesString}}
`;
    return content;
  }

  private getImports(components: ComponentMetaData[]): string[] {
    const importStatements = [];
    const angularCoreImports = [];
    if (components.some((metaData) => metaData.decorator === 'Component')) {
      angularCoreImports.push('Component');
    }
    if (components.some((metaData) => metaData.decorator === 'Directive')) {
      angularCoreImports.push('Directive');
    }
    const hasInputOutput = (metaData: ComponentMetaData, direction: string) =>
      metaData.properties.some((prop) => prop.direction === direction);
    const hasInput = (metaData) => hasInputOutput(metaData, 'input');
    const hasOutput = (metaData) => hasInputOutput(metaData, 'output');
    if (components.some(hasInput)) {
      angularCoreImports.push('Input');
    }
    if (components.some(hasOutput)) {
      angularCoreImports.push('Output', 'EventEmitter');
    }
    importStatements.push(`import { ${angularCoreImports.join(', ')} } from '@angular/core';`);

    if (
      components.some((metaData) =>
        metaData.properties.some((prop) => prop.type && prop.type.indexOf('Observable<') > -1)
      )
    ) {
      importStatements.push(`import { Observable } from 'rxjs';`);
    }

    return importStatements;
  }

  private renderProperties(properties: any[]) {
    let renderedProps = properties.map((prop) => {
      switch (prop.direction) {
        case 'input':
          const typeDeclaration = prop.type ? `: ${prop.type}` : '';
          return `@Input() ${prop.name}${typeDeclaration};`;
        case 'output':
          return `@Output() ${prop.name} = ${prop.initializer};`;
      }
    });
    const separator = '\n  ';
    return renderedProps.length ? separator + renderedProps.join(separator) + '\n' : '';
  }

  private generateMetaData(fileName: string) {
    const sourceFile = ts.createSourceFile(
      fileName,
      readFileSync(fileName).toString(),
      ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
    );
    const components = [];
    sourceFile.forEachChild((node) => {
      if (ts.isClassDeclaration(node)) {
        const componentMetaData = { className: '', decorator: '', selector: '', properties: [] };
        this.visitTree(node, componentMetaData);
        if (componentMetaData.decorator) {
          components.push(componentMetaData);
        }
      }
    });
    return components;
  }

  private visitTree(node: ts.Node, componentMetaData?: ComponentMetaData) {
    if (ts.isClassDeclaration(node)) {
      this.visitClassDeclaration(node, componentMetaData);
    }
    if (ts.isPropertyDeclaration(node) || ts.isSetAccessorDeclaration(node)) {
      this.visitPropertyDeclaration(node, componentMetaData);
    }
    ts.forEachChild(node, (node) => this.visitTree(node, componentMetaData));
  }

  private visitClassDeclaration(
    classDeclaration: ts.ClassDeclaration,
    componentMetaData: ComponentMetaData
  ) {
    const className = classDeclaration.name.getText();
    componentMetaData.className = className;
    if (classDeclaration && classDeclaration.decorators) {
      classDeclaration.decorators.forEach((decorator) => {
        if (ts.isCallExpression(decorator.expression)) {
          if (ts.isIdentifier(decorator.expression.expression)) {
            const decoratorName = decorator.expression.expression.getText();
            if (decoratorName === 'Component' || decoratorName === 'Directive') {
              componentMetaData.decorator = decoratorName;
              const decoratorArg = decorator.expression.arguments[0];
              if (ts.isObjectLiteralExpression(decoratorArg)) {
                const selectorProp = decoratorArg.properties.find(
                  (prop) => prop.name.getText() === 'selector'
                );
                if (selectorProp && ts.isPropertyAssignment(selectorProp)) {
                  const selector = selectorProp.initializer.getText();
                  componentMetaData.selector = selector;
                }
              }
            }
          }
        }
      });
    }
  }

  private visitPropertyDeclaration(
    propertyDeclaration: ts.SetAccessorDeclaration | ts.PropertyDeclaration,
    componentMetaData: ComponentMetaData
  ) {
    const propertyDeclarationText = propertyDeclaration.getText();
    const isInput = propertyDeclarationText.startsWith('@Input');
    const isOutput = propertyDeclarationText.startsWith('@Output');
    if (!(isInput || isOutput)) {
      return;
    }
    const name = propertyDeclaration.name.getText();
    const type = this.getPropertyType(name, propertyDeclaration, componentMetaData);
    let initializer: string;
    if (ts.isPropertyDeclaration(propertyDeclaration)) {
      if (propertyDeclaration.initializer) {
        initializer = propertyDeclaration.initializer.getText();
      } else if (isOutput) {
        initializer = `new ${type || 'EventEmitter'}()`;
      }
    }
    const prop = {
      name,
      type,
      initializer,
      direction: isInput ? 'input' : isOutput ? 'output' : undefined,
    };

    componentMetaData.properties.push(prop);
  }

  private getPropertyType(
    propertyName: string,
    propertyDeclaration: ts.PropertyDeclaration | ts.SetAccessorDeclaration,
    componentMetaData: ComponentMetaData
  ): string {
    if (ts.isPropertyDeclaration(propertyDeclaration)) {
      return this.getPropertyTypeFromPropertyDeclaration(
        propertyName,
        propertyDeclaration,
        componentMetaData
      );
    }
    if (ts.isSetAccessorDeclaration(propertyDeclaration)) {
      return this.getPropertyTypeFromSetAccessor(
        propertyName,
        propertyDeclaration,
        componentMetaData
      );
    }
  }

  private getPropertyTypeFromPropertyDeclaration(
    propertyName: string,
    propertyDeclaration: ts.PropertyDeclaration,
    componentMetaData: ComponentMetaData
  ): string {
    let inferredType;
    if (!propertyDeclaration.type && propertyDeclaration.initializer) {
      switch (propertyDeclaration.initializer.kind) {
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.TrueKeyword:
          inferredType = 'boolean';
          break;
        case ts.SyntaxKind.NumericLiteral:
          inferredType = 'number';
          break;
        case ts.SyntaxKind.StringLiteral:
          inferredType = 'string';
          break;
        case ts.SyntaxKind.ArrayLiteralExpression:
          inferredType = '[]';
          break;
        default:
          if (!propertyDeclaration.initializer.getText().startsWith('new EventEmitter')) {
            console.warn(
              `Can't infer type for property '${componentMetaData.className}.${propertyName}':`,
              ts.SyntaxKind[propertyDeclaration.initializer.kind],
              `(${propertyDeclaration.initializer.kind})`
            );
          }
      }
    }
    return propertyDeclaration.type ? propertyDeclaration.type.getText() : inferredType;
  }

  private getPropertyTypeFromSetAccessor(
    propertyName: string,
    propertyDeclaration: ts.SetAccessorDeclaration,
    componentMetaData: ComponentMetaData
  ): string {
    let type: string;
    if (propertyDeclaration.parameters) {
      const param = propertyDeclaration.parameters[0];
      if (param && param.type) {
        type = param.type.getText();
      }
    }
    if (!type) {
      console.warn(
        `Can't infer type for property '${componentMetaData.className}.${propertyName}' from:`,
        propertyDeclaration.getText()
      );
    }
    return type;
  }

  private async formatWithPrettier(code: string) {
    const filePath = await prettier.resolveConfigFile();
    const options = await prettier.resolveConfig(filePath);
    return prettier.format(code, { ...options, parser: 'typescript' });
  }
}
