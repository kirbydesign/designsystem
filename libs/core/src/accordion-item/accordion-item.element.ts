import { CSSResultGroup, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import styles from './accordion-item.element.styles';

// Counter for generating unique element ids
// When the unigue-id-generator.helper.ts is available in the core, this should be used instead to ensure unique ids across all elements
let uniqueId = 0;

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
  private _titleId = `kirby-accordion-item-title-${++uniqueId}`;
  private _contentId = `kirby-accordion-item-content-${uniqueId}`;

  private getTitle() {
    if (this.isDisabled && !!this.disabledTitle) {
      return this.disabledTitle;
    } else {
      return this.title;
    }
  }

  private onToggleExpanded(event: UIEvent) {
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
      const assigned = slot.assignedElements({ flatten: true });
      const hasList = assigned.some((el) => el.tagName === 'KIRBY-LIST');
      this.hasList = hasList;
      this.hasPadding = !hasList;
      assigned.forEach((el) => {
        if (el.tagName === 'KIRBY-LIST') {
          el.setAttribute('shape', 'none');
        }
      });
    }
  }

  willUpdate(changedProps: Map<string, unknown>) {
    if (changedProps.has('isDisabled') && this.isDisabled) {
      this.isExpanded = false;
    }
  }

  render() {
    return html`
      <div class="content-layer" aria-disabled=${this.isDisabled}>
        <div
          aria-level=${this.headingLevel ?? nothing}
          role=${this.headingLevel ? 'heading' : nothing}
        >
          <button
            type="button"
            class="header"
            aria-expanded=${this.isExpanded}
            aria-controls=${this._contentId}
            id=${this._titleId}
            ?disabled=${this.isDisabled}
            @click=${this.onToggleExpanded}
          >
            <span class="state-layer" aria-hidden="true"></span>
            <div class="title">${this.getTitle()}</div>

            <span class="kirby-icon" aria-hidden="true">
              <kirby-icon-element name="arrow-down"></kirby-icon-element>
            </span>
          </button>
        </div>
        <div class="content" role="region" aria-labelledby=${this._titleId} id=${this._contentId}>
          <div class="content-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  updated(changedProps: Map<string, unknown>) {
    super.updated?.(changedProps);
    if (changedProps.has('isExpanded')) {
      const content = this.renderRoot.querySelector('.content');
      if (content) {
        if (this.isExpanded) {
          // Animate open
          content.style.height = '0px';
          content.style.visibility = 'visible';
          const scrollHeight = content.scrollHeight;
          requestAnimationFrame(() => {
            content.style.transition = 'height 0.2s';
            content.style.height = scrollHeight + 'px';
          });
        } else {
          // Animate close
          const scrollHeight = content.scrollHeight;
          content.style.transition = 'height 0.2s';
          content.style.height = scrollHeight + 'px';
          requestAnimationFrame(() => {
            content.style.height = '0px';
          });
        }
        // Clean up after transition
        const onTransitionEnd = () => {
          if (this.isExpanded) {
            content.style.height = 'auto';
          } else {
            content.style.visibility = 'hidden';
          }
          content.removeEventListener('transitionend', onTransitionEnd);
        };
        content.addEventListener('transitionend', onTransitionEnd);
      }
    }
  }
}
