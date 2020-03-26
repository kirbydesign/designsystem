import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { TestHelper } from '../../testing/test-helper';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;

  const createHost = createHostFactory({
    component: CardComponent,
    imports: [IonicModule.forRoot({ _testing: true })],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card></kirby-card>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('with mode attribute', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card mode="flat"></kirby-card>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('with mode attribute and nested Ionic component', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-card mode="flat">
           <ion-badge>Test</ion-badge>
         </kirby-card>`
      );
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should create nested Ionic component with default Ionic mode', async () => {
      const document = spectator.query<HTMLElement>('html', { root: true });
      const ionicGlobalMode = document.getAttribute('mode');
      const ionBadgeElement = spectator.query<HTMLElement>('ion-badge');
      expect(ionBadgeElement).toBeTruthy();
      await TestHelper.whenHydrated(ionBadgeElement);
      expect(ionBadgeElement).toHaveClass('hydrated', ionicGlobalMode);
    });
  });
});
