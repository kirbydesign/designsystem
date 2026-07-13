import { CSSResultGroup, html, nothing } from 'lit';

import { property, query } from 'lit/decorators.js';
import { arrow, computePosition, flip, Middleware, offset, shift } from '@floating-ui/dom';
import KirbyElement from '../internal/kirby-element';
import baseStyles from '../styles/element.base.styles';
import { DesignTokenHelper } from '../helpers';
import styles from './popover.element.styles';

export class KirbyPopoverElement extends KirbyElement {
  static override tagName = 'kirby-popover';
  static styles: CSSResultGroup = [baseStyles, styles];

  private invokerElement: HTMLElement;

  @query('.popover') private popoverEl: HTMLElement;
  @query('.arrow') private arrowEl: HTMLElement;

  @property({ type: Boolean }) arrow = false;

  @property()
  invoker: HTMLElement | string;

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

  connectedCallback() {
    super.connectedCallback();

    if (!this.invoker) return;
    if (typeof this.invoker === 'string') {
      this.invokerElement = document.getElementById(this.invoker);
    } else {
      this.invokerElement = this.invoker;
    }

    this.setupInvokerEventHandlers();
  }

  private handleInvokerSlotChange(e) {
    this.invokerElement = e.target.assignedElements()[0];
    this.setupInvokerEventHandlers();
  }

  private setupInvokerEventHandlers() {
    if (!this.invokerElement) return;
    if (matchMedia('(hover: hover)').matches) {
      this.invokerElement.addEventListener('pointerenter', () => this.show());
      this.invokerElement.addEventListener('pointerleave', () => this.hide());
    }
    this.invokerElement.addEventListener('focus', () => this.show());
    this.invokerElement.addEventListener('blur', () => this.hide());
  }

  async show() {
    this.popoverEl.showPopover();

    const middleware: Array<Middleware> = [
      offset(parseInt(DesignTokenHelper.size('xs'))),
      flip(),
      shift({ padding: parseInt(DesignTokenHelper.size('s')) }),
    ];

    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowEl }));
    }

    const { x, y, middlewareData, placement } = await computePosition(
      this.invokerElement,
      this.popoverEl,
      {
        placement: this.placement,
        middleware: middleware,
      }
    );

    Object.assign(this.popoverEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    if (this.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];

      Object.assign(this.arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    }
  }

  hide() {
    this.popoverEl.hidePopover();
  }

  render() {
    return html`
      <slot name="invoker" @slotchange=${this.handleInvokerSlotChange}></slot>
      <div popover="manual" class="popover">
        <slot></slot>
        ${this.arrow
          ? html`
              <div class="arrow"></div>
            `
          : nothing}
      </div>
    `;
  }
}
