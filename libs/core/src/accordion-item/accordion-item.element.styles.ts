import { css } from 'lit';

export default css`
  :host {
    --state-layer-opacity: 0;
    --state-layer-background-color: var(--kirby-black);

    display: block;
    border-bottom: 1px solid var(--kirby-accordion-item-border-color, var(--kirby-divider-color));
    box-sizing: border-box;
    position: relative;
  }

  :host(:first-child) {
    border-top: var(
      --kirby-accordion-item-first-border-top,
      1px solid var(--kirby-accordion-item-border-color, var(--kirby-divider-color))
    );
  }

  :host([hasList]) {
    --kirby-item-background: transparent;
  }

  .content-layer {
    position: relative;
    z-index: 1;
  }

  .state-layer {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    border-radius: inherit;
    z-index: 2;
  }

  .state-layer::before {
    transition: all 80ms linear;
    content: '';
    position: absolute;
    pointer-events: none;
    inset: 0;
    border-radius: inherit;
    opacity: var(--state-layer-opacity, 0);
    background-color: var(--state-layer-background-color, var(--kirby-black));
  }

  .header {
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
  }

  .title {
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

  .content {
    overflow: hidden;
    transition:
      height 0.2s,
      visibility 0.2s;
    height: 0;
    visibility: hidden;
    cursor: default;
  }

  :host([isexpanded]) .content {
    height: auto;
    visibility: visible;
  }

  :host([haspadding]) .content-body {
    padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
  }

  button[disabled] {
    pointer-events: none;
  }

  button[disabled] .kirby-icon {
    color: var(--kirby-semi-dark);
  }

  button[disabled] .title {
    color: var(--kirby-text-color-semi-dark);
  }

  button {
    color: var(--kirby-text-color-black);
  }

  button[aria-expanded='true'] .title {
    font-weight: var(--kirby-font-weight-bold);
  }

  button[aria-expanded='true'] kirby-icon-element {
    transform: rotate(180deg);
  }

  button[disabled],
  .header[disabled],
  .content-layer[aria-disabled='true'] {
    cursor: default;
  }

  :host(:last-child) {
    border-bottom: var(
      --kirby-accordion-item-last-border-bottom,
      1px solid var(--kirby-divider-color)
    );
  }

  @media (hover: hover) {
    .header:hover {
      --state-layer-opacity: 0.04;
      cursor: pointer;
    }

    .content-layer:hover {
      cursor: pointer;
    }

    .header[disabled]:hover,
    .content-layer[aria-disabled='true']:hover {
      --state-layer-opacity: 0;
      cursor: default;
    }
  }

  .header:active {
    --state-layer-opacity: 0.08;
  }

  @media (pointer: fine) {
    .header:focus-visible {
      --state-layer-opacity: 0.04;
      box-shadow: none;
      outline: 0;
    }
  }
`;
