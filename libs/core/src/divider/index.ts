import { KirbyDividerElement } from './divider.element';

export * from './divider.element';

KirbyDividerElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-divider': KirbyDividerElement;
  }
}
