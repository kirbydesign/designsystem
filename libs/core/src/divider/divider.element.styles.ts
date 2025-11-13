import { css } from 'lit';

export default css`
  hr {
    margin-top: 4px;
    margin-bottom: 4px;
    border: 0;
    border-top: 1px solid var(--kirby-divider-color, #ccc);
  }
  hr.no-margin {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
