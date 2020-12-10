import * as ts from 'typescript';
import * as prettier from 'prettier';

import { posix as path, resolve } from 'path';

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
const { readdir, readFile } = require('fs').promises;

const newLine = '\r\n';

type ComponentMetaData = {
  className: string;
  decorator: string;
  selector: string;
  properties: any[];
  methods: any[];
};

export class GenerateMocks {
  async renderMocks(rootPath: string, outputPath: string, subPath: string) {
    const inputPath = path.join(rootPath, subPath);
    const outputPathNormalized = path.normalize(outputPath);
    const classMap = new Map<string, string[]>();
    const exportedComponents = await this.getExportedComponents(inputPath);
    await this.traverseFolder(
      inputPath,
      outputPathNormalized,
      subPath,
      classMap,
      exportedComponents
    );
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
      .join(newLine);
    const components = Array.from(classMap.values())
      .map((classNames) => classNames.join(`,${newLine}  `))
      .join(`,${newLine}  `);
    const filename = path.join(outputPath, '/mock-components.ts');
    const content = `${imports}

export const MOCK_COMPONENTS = [
  ${components},
];
`;
    const formatted = await this.formatWithPrettier(content);
    writeFileSync(filename, formatted);
  }

  private async getExportedComponents(folderpath: string): Promise<string[]> {
    const files = await this.getBarrelFiles(folderpath);
    const exportedTypes = await Promise.all(
      files.map(async (file) => {
        const fileContent = await readFile(file, 'utf8');
        const typesInFile = [];
        const exportRegEx = /^export \{ *(.*) *\} from '\.\//;
        const exportRegExGlobal = new RegExp(exportRegEx, 'gm');
        // "|| []" prevents having to check for undefined:
        (fileContent.match(exportRegExGlobal) || []).forEach((matchedLine) => {
          // "slice(1)" skips the full match:
          (matchedLine.match(exportRegEx) || []).slice(1).forEach((exported) => {
            // Split multiple entries, trim away whitespace and add:
            typesInFile.push(...exported.split(',').map((entry) => entry.trim()));
          });
        });
        return typesInFile;
      })
    );
    return Array.prototype.concat(...exportedTypes);
  }

  private async getBarrelFiles(folderpath: string) {
    const dirents = await readdir(folderpath, { withFileTypes: true });
    const files = await Promise.all(
      dirents
        .filter((dirent) => {
          return dirent.isDirectory() || dirent.name.endsWith('index.ts');
        })
        .map((dirent) => {
          const res = resolve(folderpath, dirent.name);
          return dirent.isDirectory() ? this.getBarrelFiles(res) : res;
        })
    );
    return Array.prototype.concat(...files);
  }

  private async traverseFolder(
    folderpath: string,
    outputPath: string,
    subPath: string,
    classMap: Map<string, string[]>,
    exportedComponents: string[]
  ) {
    const folderContent = readdirSync(folderpath);
    for (const fileOrFolder of folderContent) {
      const fullPath = path.join(folderpath, fileOrFolder);
      const ent = statSync(fullPath);
      if (ent.isDirectory()) {
        await this.traverseFolder(fullPath, outputPath, subPath, classMap, exportedComponents);
      } else {
        if (fileOrFolder.endsWith('.component.ts')) {
          // console.log('Rendering mock for: ', fullPath);
          const newFilename = path.join(outputPath, subPath, 'mock.' + fileOrFolder);
          const classNames = await this.renderMock(fullPath, newFilename, exportedComponents);
          if (classNames) {
            classMap.set(newFilename, classNames);
          }
        }
      }
    }
  }

  private async renderMock(fileName: string, newFilename: string, exportedComponents: string[]) {
    const components = this.generateMetaData(fileName);
    if (!components.find((metaData) => metaData.decorator)) {
      // Nothing to generate:
      return;
    }
    if (!components.some((metaData) => exportedComponents.indexOf(metaData.className) > -1)) {
      // Nothing to generate:
      return;
    }
    const rendered = [];
    const classNames = [];
    components.forEach((metaData) => {
      const mockClassName = 'Mock' + metaData.className;
      classNames.push(mockClassName);
      const classDeclaration = this.renderClass(metaData.className, mockClassName, metaData);
      rendered.push(classDeclaration);
    });

    const startRegion = '// #region AUTO-GENERATED';
    const endRegion = '// #endregion';
    const autoGeneratedContent = `${startRegion} - PLEASE DON'T EDIT CONTENT WITHIN!
${rendered.join(newLine)}
${endRegion}
`;
    const importStatements = this.getImports(components).join(newLine) + newLine + newLine;
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

  private renderClass(
    className: string,
    mockClassName: string,
    componentMetaData: ComponentMetaData
  ): string {
    const propertiesString = this.renderProperties(componentMetaData.properties);
    const methodsString = this.renderMethods(componentMetaData.methods);
    const validSelector =
      componentMetaData.selector &&
      (componentMetaData.selector.startsWith(`'kirby`) ||
        componentMetaData.selector.startsWith(`'[kirby`));
    const tsLintDisableSelector =
      componentMetaData.selector && !validSelector
        ? `${newLine}  // tslint:disable-next-line: component-selector`
        : '';
    const selector = componentMetaData.selector
      ? `${tsLintDisableSelector}${newLine}  selector: ${componentMetaData.selector},`
      : '';
    const template =
      componentMetaData.decorator === 'Component'
        ? `${newLine}  template: '<ng-content></ng-content>',`
        : '';
    const providers = `
providers: [
    {
      provide: ${className},
      useExisting: forwardRef(() => ${mockClassName}),
    },
  ],
`;

    const config = `{${selector}${template}${providers}}`;
    const content = `@${componentMetaData.decorator}(${config})
export class ${mockClassName} {${propertiesString}${methodsString}}
`;
    return content;
  }

  private getImports(components: ComponentMetaData[]): string[] {
    const importStatements = [];
    const angularCoreImports = ['forwardRef'];
    if (components.some((metaData) => metaData.decorator === 'Component')) {
      angularCoreImports.push('Component');
    }
    if (components.some((metaData) => metaData.decorator === 'Directive')) {
      angularCoreImports.push('Directive');
    }
    const hasInputOutput = (metaData: ComponentMetaData, direction: string) =>
      metaData.properties.some((prop) => prop.direction === direction);
    const hasInput = (metaData) => hasInputOutput(metaData, 'Input');
    const hasOutput = (metaData) => hasInputOutput(metaData, 'Output');
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

    const kirbyImports = components.map((metaData) => metaData.className);
    importStatements.push(
      `${newLine}import { ${kirbyImports.join(', ')} } from '@kirbydesign/designsystem';`
    );

    return importStatements;
  }

  private renderProperties(properties: any[]) {
    let renderedProps = properties.map((prop) => {
      switch (prop.direction) {
        case 'Input':
          const typeDeclaration = prop.type ? `: ${prop.type}` : '';
          const bindingProperty = prop.bindingProperty || '';
          return `@Input(${bindingProperty}) ${prop.name}${typeDeclaration};`;
        case 'Output':
          return `@Output() ${prop.name} = ${prop.initializer};`;
      }
    });
    const separator = `${newLine}  `;
    return renderedProps.length ? separator + renderedProps.join(separator) + newLine : '';
  }

  private renderMethods(methods: any[]) {
    let renderedMethods = methods.map((method) => {
      return `${method.name}() {};`;
    });
    const separator = `${newLine}  `;
    return renderedMethods.length ? separator + renderedMethods.join(separator) + newLine : '';
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
        const componentMetaData: ComponentMetaData = {
          className: '',
          decorator: '',
          selector: '',
          properties: [],
          methods: [],
        };
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
    if (ts.isMethodDeclaration(node)) {
      this.visitMethodDeclaration(node, componentMetaData);
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
    const inputOutputDecorator = this.getInputOutputDecorator(propertyDeclaration);
    if (!inputOutputDecorator.type) {
      // Only render Input/Output properties:
      return;
    }
    const name = propertyDeclaration.name.getText();
    const type = this.getPropertyType(name, propertyDeclaration, componentMetaData);
    let initializer: string;
    if (ts.isPropertyDeclaration(propertyDeclaration)) {
      if (propertyDeclaration.initializer) {
        initializer = propertyDeclaration.initializer.getText();
      } else if (inputOutputDecorator.type === 'Input') {
        initializer = `new ${type || 'EventEmitter'}()`;
      }
    }
    const prop = {
      name,
      type,
      initializer,
      direction: inputOutputDecorator.type,
      bindingProperty: inputOutputDecorator.bindingProperty,
    };

    componentMetaData.properties.push(prop);
  }

  private visitMethodDeclaration(
    methodDeclaration: ts.MethodDeclaration,
    componentMetaData: ComponentMetaData
  ) {
    // Only render methods explicitly marked as public :
    if (
      !methodDeclaration.modifiers ||
      !methodDeclaration.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.PublicKeyword)
    ) {
      return;
    }
    const name = methodDeclaration.name.getText();
    if (name.startsWith('ng') || name.startsWith('_')) return;
    const type = methodDeclaration.type; // this.getPropertyType(name, methodDeclaration, componentMetaData);
    const method = {
      name,
      type,
    };

    componentMetaData.methods.push(method);
  }

  private getInputOutputDecorator(
    propertyDeclaration: ts.SetAccessorDeclaration | ts.PropertyDeclaration
  ): { type: 'Input' | 'Output'; bindingProperty: string } {
    const inputOutputDecorator = { type: undefined, bindingProperty: undefined };
    if (propertyDeclaration && propertyDeclaration.decorators) {
      propertyDeclaration.decorators.forEach((decorator) => {
        if (ts.isCallExpression(decorator.expression)) {
          if (ts.isIdentifier(decorator.expression.expression)) {
            const decoratorName = decorator.expression.expression.getText();
            if (decoratorName === 'Input' || decoratorName === 'Output') {
              inputOutputDecorator.type = decoratorName;
              const bindingPropertyArg = decorator.expression.arguments[0];
              if (bindingPropertyArg && ts.isStringLiteral(bindingPropertyArg)) {
                inputOutputDecorator.bindingProperty = bindingPropertyArg.getText();
              }
            }
          }
        }
      });
    }
    return inputOutputDecorator;
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
