import { KirbyBadge } from './badge.component.js';

window.customElements.define('kirby-badge', KirbyBadge);

declare global {
  interface HTMLElementTagNameMap {
    'kirby-badge': KirbyBadge;
  }
}
