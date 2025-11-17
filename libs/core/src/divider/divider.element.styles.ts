import { css } from 'lit';

export default css`
  hr {
    margin-block: 0;
    border: none;
    border-top: 1px solid var(--kirby-divider-color);
  }
  
  :host([hasMargin) hr,
    margin-block: var(--kirby-spacing-xxxs)
  }
`;
