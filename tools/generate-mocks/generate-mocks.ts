import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { posix as path, resolve } from 'path';
import { Configuration, Linter } from 'tslint';
import * as ts from 'typescript';
const { readdir, readFile } = require('fs').promises;

const newLine = '\r\n';
const autoGeneratedFileHeader = `// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY`;

type ComponentMetaData = {
  className: string;
  decorator: string;
  selector: string;
  properties: any[];
  methods: any[];
};

type OutputPaths = {
  base: string;
  jasmine: string;
  jest: string;
};

export class GenerateMocks {
  async renderMocks(rootPath: string, outputPaths: OutputPaths, subPath: string) {
    const inputPath = path.join(rootPath, subPath);
    const outputPathNormalized = path.normalize(outputPaths.base);
    const classMap = new Map<string, string[]>();
    const exportedProviders: ComponentMetaData[] = [];
    const assertedTypesMap = new Map<string, string>();
    const exportedTypes = await this.getExportedTypes(inputPath, assertedTypesMap);
    await this.traverseFolder(
      inputPath,
      outputPathNormalized,
      classMap,
      exportedTypes,
      exportedProviders,
      assertedTypesMap
    );
    this.renderMockComponentDeclaration(classMap, outputPathNormalized);
    this.renderMockProviders(exportedProviders, path.normalize(outputPaths.jasmine), 'jasmine');
    this.renderMockProviders(exportedProviders, path.normalize(outputPaths.jest), 'jest');
  }

  private renderMockComponentDeclaration(classMap: Map<string, string[]>, outputPath: string) {
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
    const content = `${autoGeneratedFileHeader}

${imports}

export const MOCK_COMPONENTS = [
  ${components},
];
`;
    this.saveFileLinted(filename, content);
  }

  private renderMockProviders(
    exportedProviders: ComponentMetaData[],
    outputPath: string,
    testFramework: 'jasmine' | 'jest'
  ) {
    const hasObservableProperties = exportedProviders.some((provider) =>
      provider.properties.some((p) => p.type === 'Observable')
    );
    const imports = this.getImports(exportedProviders);
    if (hasObservableProperties) {
      imports.push(`import { EMPTY } from 'rxjs';`);
    }
    const importStatements = imports.join(newLine);
    const mockProviderFactoryRenderer =
      testFramework === 'jasmine'
        ? this.renderJasmineMockProviderFactory.bind(this)
        : this.renderJestMockProviderFactory.bind(this);

    const factories = exportedProviders.map(mockProviderFactoryRenderer).join(newLine + newLine);
    const providers = exportedProviders
      .map(
        (provider) =>
          `{
  provide: ${provider.className},
  useFactory: ${this.getMockProviderFactoryName(provider.className)}
}`
      )
      .join(`,${newLine}  `);
    const filename = path.join(outputPath, '/mock-providers.ts');
    const content = `${autoGeneratedFileHeader}
    
    ${importStatements}

    ${factories}

export const MOCK_PROVIDERS = [
${providers},
];
`;
    this.saveFileLinted(filename, content);
  }

  private async getExportedTypes(
    folderpath: string,
    assertedTypesMap: Map<string, string>
  ): Promise<string[]> {
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
        const filteredTypes = this.mapAndRemoveTypeAssertions(typesInFile, assertedTypesMap);
        return filteredTypes;
      })
    );
    return Array.prototype.concat(...exportedTypes);
  }

  mapAndRemoveTypeAssertions(
    exportedTypes: string[],
    assertedTypesMap: Map<string, string>
  ): string[] {
    // capture group 1 is internal component name, group 2 is exported name
    const assertedTypeRegex = /(\w+) as (\w+)/;

    const exports = exportedTypes.map((type) => {
      const match = type.match(assertedTypeRegex);
      if (match) {
        // add both matches to the map, but only return the exported type
        assertedTypesMap.set(match[1], match[2]);
        return match[2];
      }
      return type;
    });

    return exports;
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
    classMap: Map<string, string[]>,
    exportedTypes: string[],
    exportedProviders: ComponentMetaData[],
    assertedTypesMap: Map<string, string>
  ) {
    const folderContent = readdirSync(folderpath);
    for (const fileOrFolder of folderContent) {
      const fullPath = path.join(folderpath, fileOrFolder);
      const ent = statSync(fullPath);
      if (ent.isDirectory()) {
        await this.traverseFolder(
          fullPath,
          outputPath,
          classMap,
          exportedTypes,
          exportedProviders,
          assertedTypesMap
        );
      } else {
        if (fileOrFolder.endsWith('.component.ts') || fileOrFolder.endsWith('proxies.ts')) {
          const newFilename = path.join(outputPath, 'components', 'mock.' + fileOrFolder);
          const classNames = this.renderMock(
            fullPath,
            newFilename,
            exportedTypes,
            assertedTypesMap
          );
          if (classNames) {
            classMap.set(newFilename, classNames);
          }
        }
        if (fileOrFolder.endsWith('.controller.ts') || fileOrFolder.endsWith('.service.ts')) {
          exportedProviders.push(...this.getExportedProvidersMetadata(fullPath, exportedTypes));
        }
      }
    }
  }

  private getExportedProvidersMetadata(fileName: string, exportedTypes: string[]) {
    return this.generateMetaData(fileName).filter(
      (metaData) =>
        metaData.decorator === 'Injectable' &&
        exportedTypes.includes(metaData.className) &&
        metaData.methods.length
    );
  }

  private renderJasmineMockProviderFactory(componentMetaData: ComponentMetaData) {
    const methodNames = componentMetaData.methods.map((m) => `'${m.name}'`).join(',' + newLine);
    const methodNamesArray = `[${methodNames}]`;
    const observableProperties = this.getObservableProperties(componentMetaData).join(
      ',' + newLine
    );
    const propertyNamesObject = observableProperties.length ? `, { ${observableProperties} }` : '';
    const funcName = this.getMockProviderFactoryName(componentMetaData.className);
    return `export function ${funcName}() {
  return jasmine.createSpyObj<${componentMetaData.className}>('${componentMetaData.className}', ${methodNamesArray}${propertyNamesObject}
  ); 
}`;
  }

  private renderJestMockProviderFactory(componentMetaData: ComponentMetaData) {
    const mockMethods = componentMetaData.methods.map((m) => `${m.name}: jest.fn()`);
    const observableProperties = this.getObservableProperties(componentMetaData);
    const members = mockMethods.concat(observableProperties).join(',' + newLine);
    const funcName = this.getMockProviderFactoryName(componentMetaData.className);
    return `export function ${funcName}() {
  return {
    ${members}
  };
}`;
  }

  private getObservableProperties(componentMetaData: ComponentMetaData) {
    return componentMetaData.properties
      .filter((p) => p.type === 'Observable')
      .map((p) => `${p.name}: EMPTY`); // Ensure observable properties can be subscribed, see: https://ng-mocks.sudo.eu/extra/mock-observables
  }

  private getMockProviderFactoryName(className: string) {
    return className[0].toLowerCase() + className.slice(1) + 'Factory';
  }

  private renderMock(
    fileName: string,
    newFilename: string,
    exportedTypes: string[],
    assertedTypesMap: Map<string, string>
  ) {
    const components = this.generateMetaData(fileName, assertedTypesMap);

    const hasExportedComponents = components.some(
      (metaData) => !!metaData.decorator && exportedTypes.includes(metaData.className)
    );
    if (!hasExportedComponents) {
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
    this.saveFileLinted(newFilename, content);
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
    const angularCoreImports: string[] = [];
    const hasDecoratedType = (type: string) =>
      components.some((metaData) => metaData.decorator === type);
    const hasComponent = hasDecoratedType('Component');
    const hasDirective = hasDecoratedType('Directive');
    if (hasComponent || hasDirective) {
      angularCoreImports.push('forwardRef');
    }
    if (hasComponent) {
      angularCoreImports.push('Component');
    }
    if (hasDirective) {
      angularCoreImports.push('Directive');
    }
    const hasInputOutput = (metaData: ComponentMetaData, direction: string) =>
      metaData.properties.some((prop) => prop.direction === direction);
    const hasInput = (metaData: ComponentMetaData) => hasInputOutput(metaData, 'Input');
    const hasOutput = (metaData: ComponentMetaData) => hasInputOutput(metaData, 'Output');
    if (components.some(hasInput)) {
      angularCoreImports.push('Input');
    }
    if (components.some(hasOutput)) {
      angularCoreImports.push('Output', 'EventEmitter');
    }
    if (angularCoreImports.length) {
      importStatements.push(`import { ${angularCoreImports.join(', ')} } from '@angular/core';`);
    }

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

  private generateMetaData(fileName: string, assertedTypesMap?: Map<string, string>) {
    const sourceFile = ts.createSourceFile(
      fileName,
      readFileSync(fileName).toString(),
      ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
    );
    const components: ComponentMetaData[] = [];
    sourceFile.forEachChild((node) => {
      if (ts.isClassDeclaration(node)) {
        const componentMetaData: ComponentMetaData = {
          className: '',
          decorator: '',
          selector: '',
          properties: [],
          methods: [],
        };
        this.visitTree(node, componentMetaData, assertedTypesMap);
        if (componentMetaData.decorator) {
          components.push(componentMetaData);
        }
      }
    });
    return components;
  }

  private visitTree(
    node: ts.Node,
    componentMetaData?: ComponentMetaData,
    assertedTypesMap?: Map<string, string>
  ) {
    if (ts.isClassDeclaration(node)) {
      this.visitClassDeclaration(node, componentMetaData, assertedTypesMap);
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
    componentMetaData: ComponentMetaData,
    assertedTypesMap: Map<string, string>
  ) {
    const className = classDeclaration.name.getText();

    if (assertedTypesMap?.get(className)) {
      componentMetaData.className = assertedTypesMap.get(className);
    } else {
      componentMetaData.className = className;
    }

    if (classDeclaration && classDeclaration.decorators) {
      classDeclaration.decorators.forEach((decorator) => {
        if (ts.isCallExpression(decorator.expression)) {
          if (ts.isIdentifier(decorator.expression.expression)) {
            const decoratorName = decorator.expression.expression.getText();
            if (
              decoratorName === 'Component' ||
              decoratorName === 'Directive' ||
              decoratorName === 'Injectable'
            ) {
              componentMetaData.decorator = decoratorName;
              const decoratorArg = decorator.expression.arguments[0];
              if (decoratorArg && ts.isObjectLiteralExpression(decoratorArg)) {
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
    if (componentMetaData.decorator === 'Injectable') {
      // Only render provider properties explicitly marked as public :
      if (
        !propertyDeclaration.modifiers ||
        !propertyDeclaration.modifiers.some(
          (modifier) => modifier.kind === ts.SyntaxKind.PublicKeyword
        )
      ) {
        return;
      }
    } else if (!inputOutputDecorator.type) {
      // Only render Input/Output properties for components and directives:
      return;
    }

    const name = propertyDeclaration.name.getText();
    const type = this.getPropertyType(name, propertyDeclaration, componentMetaData);
    let initializer: string;
    if (ts.isPropertyDeclaration(propertyDeclaration)) {
      initializer = propertyDeclaration.initializer?.getText();
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
          const propInitializer = propertyDeclaration.initializer.getText();
          if (propInitializer.startsWith('new EventEmitter')) {
            inferredType = 'EventEmitter';
            break;
          }
          if (
            propInitializer.match(
              /\.asObservable\(\)|^of\(|new (?:Observable|Subject|ReplaySubject)\(/
            )
          ) {
            inferredType = 'Observable';
            break;
          }
          console.warn(
            `Can't infer type for property '${componentMetaData.className}.${propertyName}':`,
            ts.SyntaxKind[propertyDeclaration.initializer.kind],
            `(${propertyDeclaration.initializer.kind})`
          );
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

  private saveFileLinted(filename: string, content: string) {
    const configuration = Configuration.findConfiguration('tslint.json', filename).results;
    const linter = new Linter({ fix: true });
    linter.lint(filename, content, configuration);
  }
}
