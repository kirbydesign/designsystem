import { CSSResultGroup, html, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import styles from './accordion-item.element.styles';

// Counter for generating unique element ids
// When the unique-id-generator.helper.ts is available in the core, this should be used instead to ensure unique ids across all elements
let uniqueId = 0;

export class KirbyAccordionItemElement extends KirbyElement {
  static override tagName = 'kirby-accordion-item';

  static styles: CSSResultGroup = [baseStyles, styles];

  @property({ type: String }) title = '';
  @property({ type: Boolean, reflect: true }) isExpanded = false;
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: String }) disabledTitle = '';
  @property({ type: Boolean, reflect: true }) hasPadding = true;
  @state() hasList = false;
  @property({ type: Number }) headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  private _contentId = `kirby-accordion-item-content-${uniqueId++}`;

  private onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assigned = slot.assignedElements({ flatten: true });
    const hasList = assigned.some((el) => el.tagName === 'KIRBY-LIST');

    this.hasList = hasList;
    this.hasPadding = !hasList;

    if (hasList) {
      assigned.forEach((el) => {
        if (el.tagName === 'KIRBY-LIST') {
          el.setAttribute('shape', 'none');
        }
      });
    }
  }

  willUpdate(changedProps: PropertyValues<this>) {
    if (changedProps.has('isDisabled') && this.isDisabled) {
      this.isExpanded = false;
    }
  }

  private getTitle() {
    if (this.isDisabled && this.disabledTitle) {
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
      <div class="item">
        <div
          aria-level=${this.headingLevel ?? nothing}
          role=${this.headingLevel ? 'heading' : nothing}
        >
          <button
            type="button"
            class="header"
            aria-expanded=${this.isExpanded}
            aria-controls=${this._contentId}
            @click=${this.onToggleExpanded}
            ?disabled=${this.isDisabled}
          >
            <span class="state-layer" aria-hidden="true"></span>
            <div class="title">${this.getTitle()}</div>

            <span class="icon" aria-hidden="true">
              <kirby-icon-element name="arrow-down"></kirby-icon-element>
            </span>
          </button>
        </div>
        <div class="content" aria-hidden=${!this.isExpanded} id=${this._contentId}>
          <div class="content-body">
            <slot @slotchange=${this.onSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }
}
