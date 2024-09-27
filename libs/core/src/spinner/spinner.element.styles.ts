import { css } from 'lit';

export default css`
  :host {
    display: block;
    width: var(--kirby-spacing-l);
    height: var(--kirby-spacing-l);
    position: relative;
    margin: 0 auto;
  }

  .inner-circle,
  .outer-circle {
    width: 100%;
    height: 100%;
    border-radius: var(--kirby-border-radius-circle);
    background-color: var(--kirby-primary);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: bounce 2s infinite ease-in-out;
  }

  .outer-circle {
    animation-delay: -1s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }
  }
`;
