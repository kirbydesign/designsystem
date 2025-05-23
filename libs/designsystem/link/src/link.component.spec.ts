import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
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
        'background-color': 'none',
      });
    });

    it('should render with pointer cursor', () => {
      expect(element).toHaveComputedStyle({ cursor: 'pointer' });
    });

    it('should render with underlined decoration', () => {
      expect(element).toHaveComputedStyle({ 'text-decoration': 'underline' });
    });

    it('should render with no border and padding', () => {
      expect(element).toHaveComputedStyle({ border: 'none', padding: '0' });
    });

    it('should render with inhereted font and color', () => {
      expect(element).toHaveComputedStyle({ font: 'inherit', color: 'inherit' });
    });
  });
});
