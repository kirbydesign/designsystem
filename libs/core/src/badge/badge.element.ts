import { CSSResultGroup, html } from 'lit';
import { property } from 'lit/decorators.js';

import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';

import styles from './badge.element.styles';

export type BadgeVariant = 'white' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export class KirbyBadgeElement extends KirbyElement {
  static override tagName = 'kirby-badge';

  static styles: CSSResultGroup = [baseStyles, styles];

  /** The badge's theme variant. */
  @property({ reflect: true })
  themeColor: BadgeVariant = 'white';

  /** The badge's size. */
  @property({ reflect: true })
  size: BadgeSize = 'md';

  private _text: string;
  get text(): string {
    return this._text;
  }
  /**
   * @deprecated The 'text' property has been deprecated.
   * Please set the text of the Badge between the opening and closing tag.
   */
  @property() set text(value: string) {
    console.warn(
      '[Kirby Badge] The `text` property has been deprecated. Please set the text of the Badge between the opening and closing tag.'
    );
    this._text = value;
  }

  render() {
    const content =
      this.text && this.size === 'md'
        ? html`
            ${this.text}
          `
        : html`
            <slot ?hidden=${this.size === 'sm'}></slot>
          `;
    return html`
      <span part="base" role="status">${content}</span>
    `;
  }
}
