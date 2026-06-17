import { KirbyAccordionItemElement } from './accordion-item.element';

export * from './accordion-item.element';

KirbyAccordionItemElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-accordion-item': KirbyAccordionItemElement;
  }
}
