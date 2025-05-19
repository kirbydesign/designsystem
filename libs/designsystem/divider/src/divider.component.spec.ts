import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let spectator: SpectatorHost<DividerComponent>;

  const createHost = createHostFactory({
    component: DividerComponent,
    imports: [DividerComponent],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-divider></kirby-divider>');
    });

    it('should have role presentation', () => {
      const dividerElement = spectator.element.querySelector('hr');
      expect(dividerElement.getAttribute('role')).toBe('presentation');
    });
  });
});
