import { css } from 'lit';

export default css`
  hr {
    margin-block: var(--kirby-spacing-xxxs);
    border: none;
    border-top: 1px solid var(--kirby-divider-color);
  }
  :host([hasMargin='false']) hr,
  :host([hasMargin='false']) hr[role='presentation'] {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
