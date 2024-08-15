import { CSSResultGroup, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import componentStyles from '../styles/component.styles';
import styles from './badge.styles';

export type BadgeVariant = 'white' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export class KirbyBadge extends LitElement {
  // TODO: Move to base class
  static define(whosCalling: string) {
    const name = 'kirby-badge';
    const currentlyRegisteredConstructor = customElements.get(name) as CustomElementConstructor;
    if (!currentlyRegisteredConstructor) {
      // console.warn(`Registering ${name}... Called by: ${whosCalling}`);
      window.customElements.define(name, KirbyBadge);
      // } else {
      //   console.warn(`${name} already defined... Called by: ${whosCalling}`);
    }
  }

  static styles: CSSResultGroup = [componentStyles, styles];

  /** The badge's theme variant. */
  @property({ reflect: true })
  themeColor: BadgeVariant = 'white';

  /** The badge's size. */
  @property({ reflect: true })
  size: BadgeSize = 'md';

  render() {
    return html`
      <span part="base">
        <slot ?hidden=${this.size === 'sm'}></slot>
      </span>
    `;
  }
}
