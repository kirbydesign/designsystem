import { ClassField, CustomElement } from 'custom-elements-manifest/schema';

export interface LitCustomElement extends CustomElement {
  path: string;
  tagName: string;
  tagNameWithoutPrefix: string;
  properties?: ReactiveProperty[];
}

export type ReactiveProperty = ClassField & {
  attribute?: string;
  deprecated?: string;
};
