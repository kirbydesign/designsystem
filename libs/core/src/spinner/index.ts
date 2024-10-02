import { KirbySpinnerElement } from './spinner.element';

export * from './spinner.element';

KirbySpinnerElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-spinner': KirbySpinnerElement;
  }
}
