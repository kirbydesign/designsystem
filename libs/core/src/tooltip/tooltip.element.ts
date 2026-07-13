import { CSSResultGroup, html } from 'lit';

import { property } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import styles from './tooltip.element.styles';

export class KirbyTooltipElement extends KirbyElement {
  static override tagName = 'kirby-tooltip';

  static styles: CSSResultGroup = [baseStyles, styles];

  @property() placement:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end' = 'top';

  @property() for: string;

  render() {
    return html`
      <kirby-popover placement=${this.placement} arrow="true" invoker="${this.for}">
        <slot></slot>
      </kirby-popover>
    `;
  }
}
