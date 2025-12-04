import { css } from 'lit';

export default css`
  :host {
    display: block;
    /* border-top: 1px solid var(--kirby-divider-color); */
    border-bottom: 1px solid var(--kirby-divider-color);
    box-sizing: border-box;
  }

  :host(:first-child) {
    border-top: 1px solid var(--kirby-divider-color);
  }

  :host(.has-list) {
    --kirby-item-background: transparent;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--kirby-spacing-xxs);
    height: var(--kirby-spacing-xxxl);
    padding-left: var(--kirby-spacing-s);
    padding-right: var(--kirby-spacing-s);
    user-select: none;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    font-family: var(--kirby-font-family);
    text-align: start;
    transition: background var(--kirby-transition-quick);
  }

  .title {
    flex-grow: 2;
    display: flex;
    font-size: var(--kirby-font-size-n);
  }

  .kirby-icon {
    transition: transform var(--kirby-transition-quick);
  }

  .content {
    overflow: hidden;
    transition:
      height 0.2s,
      visibility 0.2s;
    height: 0;
    visibility: hidden;
  }

  .content[expanded] {
    height: auto;
    visibility: visible;
  }

  .content {
    overflow: hidden;
    cursor: default;
  }

  .content-body.padding {
    padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
  }

  button[disabled] {
    pointer-events: none;
    cusor: none;
  }

  button[disabled] .kirby-icon {
    color: var(--kirby-color-semi-dark);
  }

  button[disabled] .title {
    color: var(--kirby-text-color-semi-dark);
  }

  button {
    color: var(--kirby-color-black);
  }

  button[aria-expanded='true'] .title {
    font-weight: var(--kirby-font-weight-bold);
  }

  button[aria-expanded='true'] .kirby-icon {
    transform: rotate(180deg);
  }

  button[disabled],
  .header[disabled],
  .content-layer[aria-disabled='true'] {
    cursor: default;
  }

  @media (hover: hover) {
    .header:hover,
    .content-layer:hover {
      background: var(--kirby-background-color-hover, #f0f0f0);
      cursor: pointer;
    }
    .header[disabled]:hover,
    .content-layer[aria-disabled='true']:hover {
      background: none;
      cursor: default;
    }
  }

  .header:focus-visible {
    background: var(--kirby-background-color-hover, #f0f0f0);
    outline: 0;
  }

  .header:active,
  .content-layer:active {
    background: var(--kirby-background-color-active, #e0e0e0);
  }
`;
