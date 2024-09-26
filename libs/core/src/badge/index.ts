import { KirbyBadgeElement } from './badge.element';

export * from './badge.element';

KirbyBadgeElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-badge': KirbyBadgeElement;
  }
}
