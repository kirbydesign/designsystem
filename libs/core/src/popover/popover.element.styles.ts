import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }

  [popover] {
    position: absolute;
    background: var(--kirby-black);
    color: var(--kirby-white);
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      // color: unset;
      // background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .arrow {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--kirby-black);
    transform: rotate(45deg);
    z-index: 3;
  }
`;
