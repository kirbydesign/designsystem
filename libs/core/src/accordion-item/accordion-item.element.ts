import { CSSResultGroup, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import styles from './accordion-item.element.styles';

// Counter for generating unique element ids
let uniqueId = 0;

export class KirbyAccordionItemElement extends KirbyElement {
  static override tagName = 'kirby-accordion-item';

  static styles: CSSResultGroup = [baseStyles, styles];

  @property({ type: String }) title = '';
  @property({ type: Boolean, reflect: true }) isExpanded = false;
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: String }) disabledTitle = '';
  @property({ type: Boolean, reflect: true }) hasPadding = true;
  @property({ type: Number }) headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  @property({ type: String }) shape = 'none';
  private _titleId = `kirby-accordion-item-title-${++uniqueId}`;
  private _contentId = `kirby-accordion-item-content-${uniqueId}`;

  getTitle() {
    if (this.isDisabled && !!this.disabledTitle) {
      return this.disabledTitle;
    } else {
      return this.title;
    }
  }

  _onToggleExpanded(event: UIEvent) {
    event.preventDefault();
    if (this.isDisabled) return;

    this.isExpanded = !this.isExpanded;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: this.isExpanded,
        bubbles: true,
        composed: true,
      })
    );
  }

  firstUpdated() {
    const slot = this.renderRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => {
        const assigned = slot.assignedElements({ flatten: true });
        assigned.forEach((el) => {
          if (el.tagName === 'KIRBY-LIST') {
            el.setAttribute('shape', 'none');
          }
        });
      });
    }
  }

  render() {
    return html`
      <div class="content-layer" aria-disabled=${this.isDisabled ? 'true' : 'false'}>
        <div
          aria-level=${this.headingLevel ?? nothing}
          role=${this.headingLevel ? 'heading' : nothing}
        >
          <button
            type="button"
            class="header"
            aria-expanded=${String(this.isExpanded)}
            aria-controls=${this._contentId}
            id=${this._titleId}
            ?disabled=${this.isDisabled}
            @click=${this._onToggleExpanded}
          >
            <span class="state-layer" aria-hidden="true"></span>
            <div class="title" ?bold=${this.isExpanded}>${this.getTitle()}</div>

            <span class="kirby-icon">
              <kirby-icon-element name="arrow-down"></kirby-icon-element>
            </span>
          </button>
        </div>
        <div
          class="content"
          role="region"
          aria-labelledby=${this._titleId}
          id=${this._contentId}
          ?expanded=${this.isExpanded}
        >
          <div class=${classMap({ 'content-body': true, padding: this.hasPadding })}>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
