import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let spectator: Spectator<BadgeComponent>;
  let ionBadge: HTMLIonBadgeElement;

  let createHost = createComponentFactory({
    component: BadgeComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost({});
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('when one character is slotted', () => {
    beforeEach(async () => {
      spectator = createHost({ props: { text: 'x' } });
      ionBadge = spectator.query('ion-badge');
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
