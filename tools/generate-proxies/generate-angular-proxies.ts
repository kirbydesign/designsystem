import fs from 'fs';
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

const packageJson = JSON.parse(fs.readFileSync(path.resolve(`${libPath}/package.json`), 'utf8'));
const elementMetadata: LitCustomElement[] = getElementMetadata(libPath, packageJson.name);

//TODO: Handle that class should be BadgeComponent not KirbyBadge in Angular component proxy
//TODO: How do we correctly import any custom types, e.g. BadgeSize, BadgeVariant in our proxies?

elementMetadata.forEach(async (element) => {
  const { name, tagName, tagNameWithoutPrefix } = element;
  const angularComponentSource = await formatWithPrettier(
    `// AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY. See generate-angular-proxies.ts.
    import { Component, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
    ${getTypeImport(element)}

    ${getJsdocElementSummary(element)}
    @Component({
    selector: '${tagName}',
    template: '<ng-content></ng-content>',
    standalone: true,
    })
    export class ${name} {
    private _el: ${name}Element;
    private _ngZone: NgZone;

    constructor(
        e: ElementRef<${name}Element>,
        ngZone: NgZone
    ) {
        this._el = e.nativeElement;
        this._ngZone = ngZone;

        ${getEventListeners(element)}
    }

    ${getInputProperties(element)} 
    ${getOutputProperties(element)}
    }`
  );

  const publicApiSouce = await formatWithPrettier(`
    // AUTO-GENERATED - PLEASE DON'T EDIT THIS FILE MANUALLY. See generate-angular-proxies.ts.
    import { ${name} } from '${packageJson.name}/${tagNameWithoutPrefix}.component';
    export * from './${tagNameWithoutPrefix}.component'
    ${name}.define();
  `);

  if (!angularComponentSource || !publicApiSouce) return;
  const angularComponentDir = `${angularLibPath}/${tagNameWithoutPrefix}`;
  const angularComponentFile = `${angularComponentDir}/${tagNameWithoutPrefix}.component.ts`;
  const angularComponentPublicApi = `${angularComponentDir}/public_api.ts`;

  fs.mkdirSync(angularComponentDir, { recursive: true });
  fs.writeFileSync(angularComponentFile, angularComponentSource, 'utf8');
  fs.writeFileSync(angularComponentPublicApi, publicApiSouce, 'utf8');
});

function getTypeImport(element: LitCustomElement) {
  const elementEntryPoint = `'${packageJson.name}/${element.tagNameWithoutPrefix}'`;
  const typeImport = `import type { ${element.name} as ${element.name}Element} from ${elementEntryPoint};`;

  return typeImport;
}

function getInputProperties(element: LitCustomElement) {
  if (!element.properties) return '';
  return element.properties
    ?.map(
      (property) => ` 
        ${getJsdocDescription(property)} ${getJsdocDescriptionDeprecated(property)}
        @Input()
        set ${property.name}(v: ${property.type?.text}) {
        this._ngZone.runOutsideAngular(() => (this._el.${property.name} = v));
        }

        get ${property.name}(): ${property.type?.text} {
        return this._el.${property.name};
        }`
    )
    .join('\n');
}

function getOutputProperties(element: LitCustomElement) {
  if (!element.events) return '';
  return element.events?.map(
    (event) => `@Output() ${eventToPropertyName(event.name)} = new EventEmitter<unknown>();`
  );
}
// TODO: any reason to not use host-listener instead?
function getEventListeners(element: LitCustomElement) {
  if (!element.events) return '';
  return element.events?.map(
    (event) => ` this._el.addEventListener('${event.name}', (e: Event) => {
      this.${eventToPropertyName(event.name)}.emit(e);
    });`
  );
}

async function formatWithPrettier(code: string) {
  const filePath = await prettier.resolveConfigFile();
  if (!filePath) return;
  const options = await prettier.resolveConfig(filePath);
  return prettier.format(code, { ...options, parser: 'typescript' });
}
