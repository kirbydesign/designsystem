import { css } from 'lit';

export default css`
  :host {
    --kirby-accordion-item-state-layer-color: var(--kirby-text-color-black);
    --kirby-accordion-item-border-color: var(--kirby-divider-color);
    --kirby-accordion-item-background: var(--kirby-item-background, transparent);

    display: block;
  }

  /* ===========================
               BASE
  =========================== */

  .item {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border-bottom: 1px solid var(--kirby-accordion-item-border-color);
    background: var(--kirby-accordion-item-background);
  }

  /* ===================================
               HEADER
  ==================================== */

  .header {
    display: flex;
    align-items: center;
    gap: var(--kirby-spacing-xxs);
    height: var(--kirby-spacing-xxxl);
    margin: 0;
    padding-inline: var(--kirby-spacing-s);
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

  .title {
    flex-grow: 1;
    display: flex;
    font-size: var(--kirby-font-size-n);
  }

  kirby-icon-element {
    transition: transform var(--kirby-transition-duration-quick);
    font-size: var(--kirby-icon-font-size, 24px);
    width: 24px;
    height: 24px;
    display: block;
  }

  :host([isdisabled]) .header {
    cursor: default;
  }

  :host([isdisabled]) .title {
    color: var(--kirby-text-color-semi-dark);
  }

  :host([isdisabled]) .icon {
    color: var(--kirby-semi-dark);
  }

  :host([isexpanded]) .title {
    font-weight: var(--kirby-font-weight-bold);
  }

  :host([isexpanded]) kirby-icon-element {
    transform: rotate(180deg);
  }

  /* ===================================
          STATE-LAYER
  ==================================== */

  .state-layer {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 2;
    pointer-events: none;
  }

  .state-layer::before {
    --_opacity: 0;
    --_opacity-hover: 0.04;
    --_opacity-active: 0.08;
    transition: opacity 80ms linear;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: var(--_opacity);
    background-color: var(--kirby-accordion-item-state-layer-color);
  }

  .header:hover .state-layer::before {
    opacity: var(--_opacity-hover);
  }

  .header:active .state-layer::before {
    opacity: var(--_opacity-active);
  }

  :host([isdisabled]) .state-layer::before {
    opacity: var(--_opacity);
  }

  /* ===================================
          CONTENT
  ==================================== */

  /* 
  Animated height for accordion content.
  Uses interpolate-size where supported,
  grid fallback for Safari/Firefox.
*/

  .content {
    overflow: hidden;
    height: 0;
    interpolate-size: allow-keywords;
    transition: height 0.25s ease;
  }

  :host([isexpanded]) .content {
    height: auto;
  }

  :host([haspadding]) .content-body {
    padding-inline: var(--kirby-spacing-s);
  }

  :host([haspadding][isexpanded]) .content-body {
    padding-bottom: var(--kirby-spacing-s);
  }

  /* Safari + Firefox */
  @supports not (interpolate-size: allow-keywords) {
    .content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s ease;
    }

    :host([isexpanded]) .content {
      grid-template-rows: 1fr;
    }

    .content-body {
      min-height: 0;
      overflow: hidden;
    }
  }

  /* ===================================
          ACCESSIBILITY FOCUS
  ==================================== */

  .header:focus-visible .state-layer::before {
    opacity: var(--_opacity-hover);
  }

  /* =====================================================================================  
          FIRST + LAST ITEM Should this be implemented in the accordion element instead?
  ====================================================================================== */
  /* :host(:first-child) {
   border-top: var(
     --kirby-accordion-item-border,
     1px solid var(--kirby-accordion-item-border-color, var(--kirby-divider-color))
   );
 }

  :host(:last-child) {
    border-bottom: var(--kirby-accordion-item-border, 1px solid var(--kirby-divider-color));
   }
  */
`;
