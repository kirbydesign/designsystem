import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }

  [popover] {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--kirby-popover-background);
    color: var(--kirby-popover-color);

    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: max-content;
      height: unset;
      border: unset;
      overflow: unset;
    }
  }

  .arrow {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--kirby-popover-background);
    transform: rotate(45deg);
    z-index: -1; // place arrow below popover content in stacking context
  }
`;
