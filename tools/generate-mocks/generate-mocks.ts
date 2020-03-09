import * as ts from 'typescript';
import * as prettier from 'prettier';

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';

type ComponentMetaData = { className: string; selector: string; properties: any[] };

export class GenerateMocks {
  renderMocks(rootPath) {
    const classMap = new Map<string, string>();
    this.traverseFolder(rootPath, classMap);
    this.renderMockComponentDeclaration(classMap);
  }

  private renderMockComponentDeclaration(classMap: Map<string, string>) {
    const imports = Array.from(classMap.entries())
      .map((keyValue) => {
        const className = keyValue[0];
        const path = keyValue[1];
        const relativePath = path.replace('./libs/testing/src/lib/', './').replace('.ts', '');
        return `import { ${className} } from '${relativePath}';`;
      })
      .join('\n');
    const components = Array.from(classMap.keys()).join(',\n  ');
    const filename = './libs/testing/src/lib/mock-components.ts';
    const content = `${imports}

export const MOCK_COMPONENTS = [
  ${components},
];
`;
    writeFileSync(filename, content);
  }

  private traverseFolder(path: string, classMap: Map<string, string>) {
    const folderContent = readdirSync(path);
    folderContent.forEach((fileOrFolder) => {
      const fullPath = path + fileOrFolder;
      const ent = statSync(fullPath);
      if (ent.isDirectory()) {
        this.traverseFolder(fullPath + '/', classMap);
      } else {
        if (fileOrFolder.endsWith('.component.ts')) {
          // console.log('Rendering mock for: ', fullPath);
          const mockFileName = 'mock.' + fullPath.substr(fullPath.lastIndexOf('/') + 1);
          const mockFilePath = './libs/testing/src/lib/components/';
          const newFilename = mockFilePath + mockFileName;
          const className = this.renderMock(fullPath, newFilename);
          if (className) {
            classMap.set(className, newFilename);
          }
        }
      }
    });
  }

  private renderMock(fileName: string, newFilename: string) {
    const componentMetaData = this.generateMetaData(fileName);
    if (!componentMetaData.selector) {
      // Nothing to generate:
      return;
    }
    const mockClassName = 'Mock' + componentMetaData.className;
    const content = this.renderClass(mockClassName, componentMetaData);
    // const formatted = await this.formatWithPrettier(content);
    writeFileSync(newFilename, content);
    return mockClassName;
  }

  private renderClass(mockClassName: string, componentMetaData: ComponentMetaData): string {
    const imports = this.getImports(componentMetaData.properties);
    const propertiesString = this.renderProperties(componentMetaData.properties);
    const content = `${imports}

@Component({
  selector: ${componentMetaData.selector},
  template: '<ng-content></ng-content>',
})
export class ${mockClassName} {${propertiesString}}
`;
    return content;
  }

  private getImports(properties: any[]): string {
    const hasInput = properties.find((prop) => prop.direction === 'input');
    const hasOutput = properties.find((prop) => prop.direction === 'output');
    const imports = ['Component'];
    if (hasInput) {
      imports.push('Input');
    }
    if (hasOutput) {
      imports.push('Output', 'EventEmitter');
    }
    return `import { ${imports.join(', ')} } from '@angular/core';`;
  }

  private renderProperties(properties: any[]) {
    let renderedProps = properties.map((prop) => {
      switch (prop.direction) {
        case 'input':
          const typeDeclaration = prop.type ? `: ${prop.type}` : '';
          return `@Input() ${prop.name}${typeDeclaration};`;
        case 'output':
          const initializer = prop.initializer || `new ${prop.type || 'EventEmitter'}()`;
          return `@Output() ${prop.name} = ${initializer};`;
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
    const componentMetaData = { className: '', selector: '', properties: [] };
    this.visitTree(sourceFile, componentMetaData);
    return componentMetaData;
  }

  private visitTree(node: ts.Node, componentMetaData?: ComponentMetaData) {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration: {
        this.visitClassDeclaration(node as ts.ClassDeclaration, componentMetaData);
        break;
      }
      case ts.SyntaxKind.PropertyDeclaration:
      case ts.SyntaxKind.SetAccessor: {
        const propertyDeclaration = node as ts.PropertyDeclaration;
        this.visitPropertyDeclaration(propertyDeclaration, componentMetaData);
        break;
      }
    }
    ts.forEachChild(node, (node) => this.visitTree(node, componentMetaData));
  }

  private visitClassDeclaration(classDeclaration: ts.ClassDeclaration, componentMetaData) {
    const className = classDeclaration.name.getText();
    componentMetaData.className = className;
    if (classDeclaration && classDeclaration.decorators) {
      classDeclaration.decorators.forEach((decorator) => {
        switch (decorator.expression.kind) {
          case ts.SyntaxKind.CallExpression:
            const decoratorExpression = decorator.expression as ts.CallExpression;
            switch (decoratorExpression.expression.kind) {
              case ts.SyntaxKind.Identifier:
                const identifier = decoratorExpression.expression as ts.Identifier;
                const decoratorName = identifier.getText();
                if (decoratorName === 'Component') {
                  const args = decoratorExpression.arguments[0] as ts.ObjectLiteralExpression;
                  const selectorArg = args.properties.find(
                    (prop) => prop.name.getText() === 'selector'
                  ) as ts.PropertyAssignment;
                  if (selectorArg) {
                    const selector = selectorArg.initializer.getText();
                    componentMetaData.selector = selector;
                  }
                }
                break;
            }
            break;
        }
      });
    }
  }

  private visitPropertyDeclaration(
    propertyDeclaration: ts.PropertyDeclaration,
    componentMetaData: ComponentMetaData
  ) {
    const propertyDeclarationText = propertyDeclaration.getText();
    let initializer: string;
    if (propertyDeclaration.initializer) {
      initializer = propertyDeclaration.initializer.getText();
    }
    const isInput = propertyDeclarationText.startsWith('@Input');
    const isOutput = propertyDeclarationText.startsWith('@Output');

    const name = propertyDeclaration.name.getText();
    const type = propertyDeclaration.type ? propertyDeclaration.type.getText() : undefined;
    const prop = {
      name,
      type,
      initializer,
      direction: isInput ? 'input' : isOutput ? 'output' : undefined,
    };
    if (isInput || isOutput) {
      componentMetaData.properties.push(prop);
    }
  }

  private async formatWithPrettier(code: string) {
    const filePath = await prettier.resolveConfigFile();
    const options = await prettier.resolveConfig(filePath);
    return prettier.format(code, { ...options, parser: 'babel' });
  }
}
