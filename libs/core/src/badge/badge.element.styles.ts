import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    position: var(--kirby-badge-position, relative);
    left: var(--kirby-badge-left, auto);
    right: var(--kirby-badge-right, auto);
    top: var(--kirby-badge-top, auto);
    z-index: var(--kirby-badge-z-index, auto);
  }

  [part='base'] {
    font-family: var(--kirby-font-family, inherit);
    font-size: 0.625rem;
    font-weight: bold;
    line-height: 1;
    contain: content;
    background-color: var(--kirby-badge-background-color);
    color: var(--kirby-badge-color);
    border-radius: var(--kirby-border-radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.3em 0.5em;
    min-height: 1rem;
    min-width: 1rem;
  }

  :host([themecolor='white']) {
    --kirby-badge-background-color: var(--kirby-white);
    --kirby-badge-color: var(--kirby-white-contrast);
  }

  /* Apply custom elevation to badge when white */
  :host([themecolor='white']) [part='base'] {
    box-shadow: 0 20px 30px -15px rgb(28 28 28 / 30%), 0 0 5px 0 rgb(28 28 28 / 12%);
  }

  :host([themecolor='success']) {
    --kirby-badge-background-color: var(--kirby-success);
    --kirby-badge-color: var(--kirby-success-contrast);
  }

  :host([themecolor='warning']) {
    --kirby-badge-background-color: var(--kirby-warning);
    --kirby-badge-color: var(--kirby-warning-contrast);
  }

  :host([themecolor='danger']) {
    --kirby-badge-background-color: var(--kirby-danger);
    --kirby-badge-color: var(--kirby-white);
  }

  :host([size='sm']) [part='base'] {
    padding: initial;
    min-height: initial;
    min-width: initial;
    height: var(--kirby-spacing-xxs);
    width: var(--kirby-spacing-xxs);
  }

  ::slotted(kirby-icon) {
    --kirby-icon-font-size: 1rem; /* TODO: var(--kirby-font-size-n) ?? */

    position: absolute;
    top: 0;
    left: 0;
  }
`;
