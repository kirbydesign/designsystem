import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ClassMember, Package } from 'custom-elements-manifest/schema';
import { LitCustomElement, ReactiveProperty } from './types';

export function getElementMetadata(libPath: string): LitCustomElement[] {
  execSync(`cem analyze`);
  const customElementManifest: Package = JSON.parse(
    fs.readFileSync(path.resolve(`${libPath}/custom-elements.json`), 'utf8')
  );
  const elementMetadata = generateElementMetadataFromManifest(customElementManifest);
  return elementMetadata;
}

function generateElementMetadataFromManifest(manifest: Package) {
  const litCustomElements: LitCustomElement[] = [];

  manifest.modules.forEach((module) => {
    module.declarations?.map((declaration: any) => {
      if (declaration.customElement) {
        const element: LitCustomElement = declaration;
        const path = module.path;

        if (element) {
          litCustomElements.push({ ...element, path, properties: getReactiveProperties(element) });
        }
      }
    });
  });

  return litCustomElements;
}

function getReactiveProperties(element: LitCustomElement) {
  const properties: ReactiveProperty[] = [];

  element.members?.forEach((member) => {
    if (!isReactiveProperty(member)) return;
    properties.push(member);
  });

  return properties;
}

function isReactiveProperty(obj: ClassMember): obj is ReactiveProperty {
  return (
    typeof obj === 'object' &&
    obj.kind === 'field' &&
    obj.privacy !== 'private' &&
    obj.privacy !== 'protected' &&
    (obj as ReactiveProperty).attribute !== undefined
  );
}

export function getJsdocDescription(property: ReactiveProperty) {
  if (!property.description) return '';
  return `/**
   * ${property.description}
   */`;
}

export function getJsdocDescriptionDeprecated(property: ReactiveProperty) {
  if (!property.deprecated) return '';
  return `/**
   * @deprecated ${property.deprecated}
   */`;
}

export function getJsdocElementSummary(element: LitCustomElement) {
  if (!element.summary) return '';
  return `/**
     * ${element.summary}
     */`;
}

export const eventToPropertyName = (eventName: string) =>
  eventName.replace(/-+([a-zA-Z])/g, (_, c) => c.toUpperCase());
