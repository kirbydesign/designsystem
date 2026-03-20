import { KirbyTooltipElement } from './tooltip.element';

export * from './tooltip.element';

KirbyTooltipElement.define();

declare global {
  interface HTMLElementTagNameMap {
    'kirby-tooltip': KirbyTooltipElement;
  }
}
