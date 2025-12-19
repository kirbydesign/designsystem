import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading>Section Header</p>
      <p label>Section Header</p>
      <p detail>Section Header</p>
    </kirby-section-header>`);
    // Ensure ion-item-divider is ready and styles are applied:
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('ion-item-divider inside section header', () => {
    it('should have correct z-index', () => {
      const divider = spectator.queryHost('ion-item-divider');
      expect(divider).toHaveComputedStyle({
        'z-index': 'auto',
      });
    });
  });
});
