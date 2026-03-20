import { KirbyPopoverElement } from './popover.element';

export * from './popover.element';

KirbyPopoverElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-popover': KirbyPopoverElement;
  }
}
