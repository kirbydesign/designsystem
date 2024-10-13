import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';

import {
  eventToPropertyName,
  getElementMetadata,
  getJsdocDescription,
  getJsdocDescriptionDeprecated,
  getJsdocElementSummary,
} from './utils/cem-helper-functions';
import { LitCustomElement } from './utils';

const libPath = 'libs/core';
const angularLibPath = 'libs/angular'; //TODO: Should this be 'libs/angular/components'?

const packageJson = JSON.parse(readFileSync(path.resolve(`${libPath}/package.json`), 'utf8'));
const elementMetadata: LitCustomElement[] = getElementMetadata(libPath, packageJson.name);

elementMetadata.forEach(async (element) => {
  const { name, tagNameWithoutPrefix } = element;

  const componentSource = await generateComponentSource(element);
  const publicApiSource = await generatePublicApiSource(name, tagNameWithoutPrefix);

  if (!componentSource || !publicApiSource) return;

  const componentDir = `${angularLibPath}/${tagNameWithoutPrefix}/src`;
  const componentFile = `${componentDir}/${tagNameWithoutPrefix}.component.ts`;
  const componentPublicApi = `${componentDir}/public_api.ts`;

  let proxySource = `${getTypeImports(element)}\n${componentSource}`;

  if (existsSync(componentFile)) {
    const existingContent = readFileSync(componentFile, 'utf8');
    const regionStartIndex = existingContent.indexOf('// START_OF_AUTO_GENERATED_COMPONENT');

    if (regionStartIndex !== -1) {
      const imports = existingContent.substring(
        0,
        regionStartIndex + '// START_OF_AUTO_GENERATED_COMPONENT'.length,
      );
      proxySource = `${imports}\n${componentSource}`;
    }
  }

  mkdirSync(componentDir, { recursive: true });
  writeFileSync(componentPublicApi, publicApiSource, 'utf8');
  writeFileSync(componentFile, proxySource, 'utf8');
});

function getTypeImports(element: LitCustomElement) {
  const elementEntryPoint = `'${packageJson.name}/${element.tagNameWithoutPrefix}'`;

  const needsOutput = element.events && element.events.length > 0;
  const needsInput = element.properties && element.properties.length > 0;

  const conditionalImports = `${needsInput ? 'Input' : ''} ${needsOutput ? 'Output, EventEmitter' : ''}`;

  return `import { Component, ElementRef, ${conditionalImports}, NgZone } from '@angular/core';
import type { ${element.name} } from ${elementEntryPoint};
// START_OF_AUTO_GENERATED_COMPONENT
`;
}

function getInputProperties(element: LitCustomElement) {
  if (!element.properties) return '';
  return element.properties
    .map(
      (property) => `
        ${getJsdocDescription(property)} ${getJsdocDescriptionDeprecated(property)}
        @Input()
        set ${property.name}(v: ${property.type?.text}) {
          this._ngZone.runOutsideAngular(() => (this._el.${property.name} = v));
        }

        get ${property.name}(): ${property.type?.text} {
          return this._el.${property.name};
        }`,
    )
    .join('\n');
}

function getOutputProperties(element: LitCustomElement) {
  if (!element.events) return '';
  return element.events
    .map((event) => `@Output() ${eventToPropertyName(event.name)} = new EventEmitter<unknown>();`)
    .join('\n');
}

function getEventListeners(element: LitCustomElement) {
  if (!element.events) return '';
  return element.events
    .map(
      (event) => `
        this._el.addEventListener('${event.name}', (e: Event) => {
          this.${eventToPropertyName(event.name)}.emit(e);
        });`,
    )
    .join('\n');
}

async function formatWithPrettier(code: string) {
  const filePath = await prettier.resolveConfigFile();
  if (!filePath) return code;
  const options = await prettier.resolveConfig(filePath);
  return prettier.format(code, { ...options, parser: 'typescript' });
}

async function generateComponentSource(element: LitCustomElement) {
  const { name, tagName } = element;
  const angularComponentName = name.replace('Element', 'Component');

  return formatWithPrettier(
    `${getJsdocElementSummary(element)}
    @Component({
      selector: '${tagName}',
      template: '<ng-content></ng-content>',
      standalone: true,
    })
    export class ${angularComponentName} {
      private _el: ${name};
      private _ngZone: NgZone;

      constructor(e: ElementRef<${name}>, ngZone: NgZone) {
        this._el = e.nativeElement;
        this._ngZone = ngZone;

        ${getEventListeners(element)}
      }

      ${getInputProperties(element)}
      ${getOutputProperties(element)}
    }`,
  );
}

async function generatePublicApiSource(name: string, tagNameWithoutPrefix: string) {
  return formatWithPrettier(`
    // AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY. See generate-angular-proxies.ts.
    import { ${name} } from '${packageJson.name}/${tagNameWithoutPrefix}.element';
    export * from './${tagNameWithoutPrefix}.component';
    ${name}.define();
  `);
}
