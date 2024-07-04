import { css, unsafeCSS } from 'lit';

import { DesignTokenHelper } from '../helpers';

const { size, fontSize } = DesignTokenHelper;

export default css`
  :host {
    contain: content;
    display: inline-block;
    position: var(--kirby-badge-position, relative);
    left: var(--kirby-badge-left, auto);
    right: var(--kirby-badge-right, auto);
    top: var(--kirby-badge-top, auto);
    z-index: var(--kirby-badge-z-index, auto);
    font-family: var(--kirby-font-family, inherit);
    font-size: 0.625rem;
    font-weight: bold;
    line-height: 1;
  }

  [part='base'] {
    background-color: var(--kirby-badge-background-color);
    box-sizing: border-box;
    color: var(--kirby-badge-color);
    border-radius: ${unsafeCSS(size('xxs'))};
    display: inline-block;
    padding: 3px 5px;
    min-height: ${unsafeCSS(size('s'))};
    min-width: ${unsafeCSS(size('s'))};
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

  :host([size='sm']) {
    font-size: 0;
  }

  :host([size='sm']) [part='base'] {
    padding: initial;
    min-height: initial;
    min-width: initial;
    height: ${unsafeCSS(size('xxs'))};
    width: ${unsafeCSS(size('xxs'))};
  }

  ::slotted(kirby-icon) {
    --kirby-icon-font-size: ${unsafeCSS(fontSize('n'))};

    position: absolute;
    top: 0;
    left: 0;
  }
`;
