import { CSSResultGroup, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import styles from './accordion-item.element.styles';

// Counter for generating unique element ids
// When the unigue-id-generator.helper.ts is available in the core, this should be used instead to ensure unique ids across all elements
const uniqueId = 0;

export class KirbyAccordionItemElement extends KirbyElement {
  static override tagName = 'kirby-accordion-item';

  static styles: CSSResultGroup = [baseStyles, styles];

  @property({ type: String }) title = '';
  @property({ type: Boolean, reflect: true }) isExpanded = false;
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: String }) disabledTitle = '';
  @property({ type: Boolean, reflect: true }) hasPadding = true;
  @property({ type: Boolean, reflect: true }) hasList = false;
  @property({ type: Number }) headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  private _contentId = `kirby-accordion-item-content-${uniqueId}`;

  firstUpdated() {
    const slot = this.renderRoot.querySelector('slot');
    if (slot) {
      const assigned = slot.assignedElements({ flatten: true });
      const hasList = assigned.some((el) => el.tagName === 'KIRBY-LIST');
      if (hasList) {
        this.hasList = true;
        this.hasPadding = false;
        assigned.forEach((el) => {
          if (el.tagName === 'KIRBY-LIST') {
            el.setAttribute('shape', 'none');
          }
        });
      }
    }
  }

  willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has('isDisabled') && this.isDisabled) {
      this.isExpanded = false;
    }
  }

  private getTitle() {
    if (this.isDisabled && !!this.disabledTitle) {
      return this.disabledTitle;
    } else {
      return this.title;
    }
  }

  private onToggleExpanded() {
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

  render() {
    return html`
      <div class="accordion-item">
        <div
          aria-level=${this.headingLevel ?? nothing}
          role=${this.headingLevel ? 'heading' : nothing}
        >
          <button
            type="button"
            class="accordion-item__header"
            aria-expanded=${this.isExpanded}
            aria-controls=${this._contentId}
            @click=${this.onToggleExpanded}
            ?disabled=${this.isDisabled}
          >
            <span class="accordion-item__state-layer" aria-hidden="true"></span>
            <div class="accordion-item__title">${this.getTitle()}</div>

            <span class="accordion-item__icon" aria-hidden="true">
              <kirby-icon-element name="arrow-down"></kirby-icon-element>
            </span>
          </button>
        </div>
        <div class="accordion-item__content" aria-hidden=${!this.isExpanded} id=${this._contentId}>
          <div class="accordion-item__content-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
