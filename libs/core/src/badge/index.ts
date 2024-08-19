import { KirbyBadge } from './badge.component';

export * from './badge.component';

KirbyBadge.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-badge': KirbyBadge;
  }
}
