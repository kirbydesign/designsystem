import { KirbyBadge } from './badge.component';

export * from './badge.component';

KirbyBadge.define('Core Badge barrel');

declare global {
  interface HTMLElementTagNameMap {
    'kirby-badge': KirbyBadge;
  }
}
