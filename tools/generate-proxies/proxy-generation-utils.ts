/*

Some of these util functions are copied over from https://github.com/blueprintui/custom-element-types/blob/main/src/utils.ts

MIT License

Copyright (c) 2022 Crylan Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ClassField, CustomElement, Package } from 'custom-elements-manifest/schema';

interface CustomElementWithPath extends CustomElement {
  path: string;
}

export type ReactiveProperty = ClassField & {
  attribute?: string;
  deprecated?: string;
};

export type LitCustomElement = CustomElementWithPath & {
  properties?: ReactiveProperty[];
  elementImport: string;
  typeImport: string;
};

export function getElementMetadata(libPath: string, packageAlias: string): LitCustomElement[] {
  execSync(`cem analyze --litelement --globs "${libPath}" --outdir "${libPath}"`);
  const customElementManifest: Package = JSON.parse(
    fs.readFileSync(path.resolve(`${libPath}/custom-elements.json`), 'utf8')
  );
  const elementMetadata = createLitElementMetadata(customElementManifest, packageAlias, libPath);

  return elementMetadata;
}

export function createLitElementMetadata(
  customElementsManifest: Package,
  packageAlias: string,
  libPath: string
): LitCustomElement[] {
  const customElements = getCustomElements(customElementsManifest);

  const litCustomElements = customElements.map((elm) => {
    const element: LitCustomElement = {
      ...elm,
      elementImport: getElementImport(elm, packageAlias, libPath),
      typeImport: getTypeImport(elm, packageAlias, libPath),
      properties: getReactiveProperties(elm),
    };

    return element;
  });

  return litCustomElements;
}

function getCustomElements(manifest: any) {
  const elementsWithPaths: CustomElementWithPath[] = [];

  manifest.modules.forEach((module: any) => {
    module.declarations?.map((declaration: any) => {
      if (declaration.customElement) {
        const element: CustomElement = declaration;
        const path = module.path;

        if (element) {
          elementsWithPaths.push({ ...element, path });
        }
      }
    });
  });

  return elementsWithPaths;
}

function getReactiveProperties(element: CustomElementWithPath) {
  const properties: ReactiveProperty[] = [];

  element.members?.forEach((member) => {
    if (!isReactiveProperty(member)) return;
    properties.push(member);
  });

  return properties;
}

function getElementImport(
  element: CustomElementWithPath,
  packageAlias: string,
  libPath: string
): string {
  const elementEntryPoint = replaceTsExtentions(`${element.path.replace(libPath, packageAlias)}`);
  const elementImport = `import '${elementEntryPoint}'`;

  return elementImport;
}

function getTypeImport(
  element: CustomElementWithPath,
  packageAlias: string,
  libPath: string
): string {
  const elementEntryPoint = replaceTsExtentions(`${element.path.replace(libPath, packageAlias)}`);
  const typeImport = `import type { ${element.name} as ${element.name}Element } from '${elementEntryPoint}'`;

  return typeImport;
}

function replaceTsExtentions(filePath: string) {
  return filePath.endsWith('.ts') ? changeExt(filePath, 'js') : filePath;
}

function changeExt(filePath: string, ext: string) {
  const pos = filePath.includes('.') ? filePath.lastIndexOf('.') : filePath.length;
  return `${filePath.substr(0, pos)}.${ext}`;
}

function isReactiveProperty(obj: any): obj is ReactiveProperty {
  return (
    obj.kind === 'field' &&
    obj.attribute !== undefined &&
    obj.privacy !== 'private' &&
    obj.privacy !== 'protected' &&
    typeof obj.attribute === 'string'
  );
}

export const eventToPropertyName = (eventName: string) =>
  eventName.replace(/-+([a-zA-Z])/g, (_, c) => c.toUpperCase());

export function getInputProperties(element: LitCustomElement) {
  return element.properties
    ?.map(
      (property) => ` 
        ${getDescription(property) ?? ''}
        ${getDescriptionDeprecated(property) ?? ''}
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

export function getOutputProperties(element: LitCustomElement) {
  return element.events?.map(
    (event) => `@Output() ${eventToPropertyName(event.name)} = new EventEmitter<unknown>();`
  );
}

export function getDescription(property: ReactiveProperty) {
  if (!property.description) return;
  return `/**
   * ${property.description}
   */`;
}

export function getDescriptionDeprecated(property: ReactiveProperty) {
  if (!property.deprecated) return;
  return `/**
   * @deprecated ${property.deprecated}
   */`;
}

// TODO: any reason to not use host-listener instead?
export function getEventListeners(element: LitCustomElement) {
  return element.events?.map(
    (event) => ` this._el.addEventListener('${event.name}', (e: Event) => {
      this.${eventToPropertyName(event.name)}.emit(e);
    });`
  );
}
