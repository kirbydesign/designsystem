import { css } from 'lit';

export default css`
  :host {
    display: block;
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

  .content[expanded] {
    height: auto;
    visibility: visible;
  }

  .content-body.padding {
    padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
  }

  button[disabled] {
    pointer-events: none;
  }

  button[disabled] .kirby-icon {
    color: var(--kirby-color-semi-dark, #8e8e8e);
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

  button[aria-expanded='true'] kirby-icon-element {
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
`;
