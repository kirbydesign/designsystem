import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { DesignTokenHelper } from '@kirbydesign/core';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let spectator: SpectatorHost<LinkComponent>;
  let element: HTMLButtonElement;

  const createHost = createHostFactory({
    component: LinkComponent,
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-link>Test</button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render with no background-color', () => {
      expect(element).toHaveComputedStyle({
        'background-color': 'rgba(0, 0, 0, 0)',
      });
    });

    it('should render with pointer cursor', () => {
      expect(element).toHaveComputedStyle({ cursor: 'pointer' });
    });

    it('should render with underlined decoration', () => {
      expect(getComputedStyle(element).textDecoration).toContain('underline');
    });

    it('should render with no border and padding', () => {
      expect(element).toHaveComputedStyle({ 'border-style': 'none', padding: '0px' });
    });

    it('should render with inhereted font and color', () => {
      expect(element).toHaveComputedStyle({
        'font-size': DesignTokenHelper.fontSize('n'),
        color: 'inherit',
      });
    });
  });
});
