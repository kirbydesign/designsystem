import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }

  kirby-popover {
    --kirby-popover-background: var(--kirby-tooltip-background, var(--kirby-black));
    --kirby-popover-color: var(--kirby-tooltip-color, var(--kirby-white));
  }
`;
