import { CSSResultGroup, html } from 'lit';

import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';

import styles from './spinner.element.styles';

export class KirbySpinnerElement extends KirbyElement {
  static override tagName = 'kirby-spinner';

  static styles: CSSResultGroup = [baseStyles, styles];

  render() {
    return html`
      <div class="inner-circle"></div>
      <div class="outer-circle"></div>
    `;
  }
}
