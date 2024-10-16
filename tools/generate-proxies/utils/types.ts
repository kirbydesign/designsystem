import { ClassField, CustomElement } from 'custom-elements-manifest/schema';

export interface ExtendedCustomElement extends CustomElement {
  path: string;
  tagName: string;
  tagNameWithoutPrefix: string;
}

export type ReactiveProperty = ClassField & {
  attribute?: string;
  deprecated?: string;
};

export type LitCustomElement = ExtendedCustomElement & {
  properties?: ReactiveProperty[];
};
