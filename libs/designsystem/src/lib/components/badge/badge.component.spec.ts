import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { customElementsInitializer } from '../../app-initialize';
import { TestHelper } from '../../testing/test-helper';
import { BadgeComponent } from '../index';

describe('BadgeComponent', () => {
  let spectator: SpectatorHost<BadgeComponent>;
  let ionBadge: HTMLIonBadgeElement;

  let createHost = createHostFactory({
    component: BadgeComponent,
    imports: [TestHelper.ionicModuleForTest],
    providers: [customElementsInitializer()],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-badge></kirby-badge>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('when one character is slotted', () => {
    beforeEach(async () => {
      spectator = createHost('<kirby-badge></kirby-badge>', { props: { text: 'x' } });
      await TestHelper.whenReady(spectator.element);

      ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should be rendered with width: 16px', () => {
      expect(ionBadge).toHaveComputedStyle({ width: '16px' });
    });

    it('should be rendered with height: 16px', () => {
      expect(ionBadge).toHaveComputedStyle({ height: '16px' });
    });
  });
});
