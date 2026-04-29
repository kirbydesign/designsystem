import { css } from 'lit';

export default css`
  :host {
    --state-layer-opacity-hover: 0.04;
    --state-layer-opacity-active: 0.08;
    --state-layer-background-color: var(--kirby-black);

    --kirby-accordion-item-border-color: var(--kirby-divider-color);
    --kirby-accordion-item-background: var(--kirby-item-background, transparent);

    display: block;
  }

  /* ===========================
               BASE
  =========================== */

  .accordion-item {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border-bottom: 1px solid var(--kirby-accordion-item-border-color, var(--kirby-divider-color));
    background: var(--kirby-accordion-item-background, var(--kirby-item-background, transparent));
  }

  /* ===================================
               HEADER
  ==================================== */

  .accordion-item__header {
    display: flex;
    align-items: center;
    gap: var(--kirby-spacing-xxs);
    height: var(--kirby-spacing-xxxl);
    margin: 0;
    padding-left: var(--kirby-spacing-s);
    padding-right: var(--kirby-spacing-s);
    user-select: none;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    font-family: var(--kirby-font-family);
    font-size: inherit;
    line-height: normal;
    text-align: start;
    color: var(--kirby-text-color-black);
    cursor: pointer;
  }

  .accordion-item__title {
    flex-grow: 1;
    display: flex;
    font-size: var(--kirby-font-size-n);
  }

  kirby-icon-element {
    transition: transform var(--kirby-transition-quick);
    font-size: var(--kirby-icon-font-size, 24px);
    width: 24px;
    height: 24px;
    display: block;
  }

  :host([isdisabled]) .accordion-item__header {
    cursor: default;
    pointer-events: none;
  }

  :host([isdisabled]) .accordion-item__title {
    color: var(--kirby-text-color-semi-dark);
  }

  :host([isdisabled]) .accordion-item__icon {
    color: var(--kirby-semi-dark);
  }

  :host([isexpanded]) .accordion-item__title {
    font-weight: var(--kirby-font-weight-bold);
  }

  :host([isexpanded]) kirby-icon-element {
    transform: rotate(180deg);
  }

  /* ===================================
          STATE-LAYER
  ==================================== */

  .accordion-item__state-layer {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 2;
    pointer-events: none;
  }

  .accordion-item__state-layer::before {
    transition: all 80ms linear;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: var(--state-layer-opacity, 0);
    background-color: var(--state-layer-background-color);
  }

  .accordion-item__header:hover .accordion-item__state-layer::before {
    opacity: var(--state-layer-opacity-hover);
  }

  .accordion-item__header:active .accordion-item__state-layer::before {
    opacity: var(--state-layer-opacity-active);
  }

  :host([isdisabled]) .accordion-item__state-layer::before {
    opacity: 0;
  }

  /* ===================================
          CONTENT
  ==================================== */

  .accordion-item__content {
    overflow: hidden;
    height: 0;
    interpolate-size: allow-keywords;
    transition: height 0.25s ease;
  }

  :host([isexpanded]) .accordion-item__content {
    height: auto;
  }

  :host([haspadding]) .accordion-item__content-body {
    padding-inline: var(--kirby-spacing-s);
  }

  :host([haspadding][isexpanded]) .accordion-item__content-body {
    padding-bottom: var(--kirby-spacing-s);
  }

  /* Safari + Firefox */
  @supports not (interpolate-size: allow-keywords) {
    .accordion-item__content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s ease;
      overflow: hidden;
    }

    :host([isexpanded]) .accordion-item__content {
      grid-template-rows: 1fr;
    }

    .accordion-item__content-body {
      overflow: hidden;
      min-height: 0;
    }
  }

  /* ===================================
          ACCESSIBILITY FOCUS
  ==================================== */

  .accordion-item__header:focus-visible .accordion-item__state-layer::before {
    opacity: var(--state-layer-opacity-hover);
    box-shadow: none;
    outline: 0;
  }

  /* ===================================
        OUTCOMMENETED - TO BE REEVALUATED
  ==================================== */

  /* :host(:first-child) {
    border-top: var(
      1px solid var(--kirby-accordion-item-border-color, var(--kirby-divider-color))
     );
   }

   :host(:last-child) {
     border-bottom: var(--kirby-accordion-item-border, 1px solid var(--kirby-divider-color));
   } */
`;
