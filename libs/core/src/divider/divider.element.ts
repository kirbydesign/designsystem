import { CSSResultGroup, html } from 'lit';
import { property } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';

import baseStyles from '../styles/element.base.styles';

import styles from './divider.element.styles';

export class KirbyDividerElement extends KirbyElement {
  static override tagName = 'kirby-divider';

  static styles: CSSResultGroup = [baseStyles, styles];
  @property({ type: Boolean }) hasMargin = true;

  render() {
    return html`
      <hr role="presentation" class=${this.hasMargin ? '' : 'no-margin'} />
    `;
  }
}
