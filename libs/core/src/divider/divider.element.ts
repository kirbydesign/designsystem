import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';

export class KirbyDividerElement extends KirbyElement {
  static override tagName = 'kirby-divider';
  @property({ type: Boolean }) hasMargin = true;

  static styles = css`
    hr {
      margin-top: 4px;
      margin-bottom: 4px;
      border: 0;
      border-top: 1px solid var(--kirby-divider-color, #ccc);
    }
    hr.no-margin {
      margin-top: 0;
      margin-bottom: 0;
    }
  `;

  render() {
    return html`
      <hr role="presentation" class=${this.hasMargin ? '' : 'no-margin'} />
    `;
  }
}
