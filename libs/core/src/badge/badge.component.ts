import { CSSResultGroup, html } from 'lit';
import { property } from 'lit/decorators.js';

import KirbyElement from '../internal/kirby-element';
import componentStyles from '../styles/component.styles';

import styles from './badge.styles';

export type BadgeVariant = 'white' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export class KirbyBadge extends KirbyElement {
  static override tagName = 'kirby-badge';

  static styles: CSSResultGroup = [componentStyles, styles];

  /** The badge's theme variant. */
  @property({ reflect: true })
  themeColor: BadgeVariant = 'white';

  /** The badge's size. */
  @property({ reflect: true })
  size: BadgeSize = 'md';

  render() {
    return html`
      <span part="base" role="status">
        <slot ?hidden=${this.size === 'sm'}></slot>
      </span>
    `;
  }
}
