import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;

  const createHost = createHostFactory({
    component: CardComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card></kirby-card>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe("with 'backgroundImageUrl' set", () => {
    const testUrl = 'https://notarealurl/';
    let cardElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost(`<kirby-card backgroundImageUrl='${testUrl}'></kirby-card>`);
      cardElement = spectator.queryHost('kirby-card');
    });

    it("should use the url for the 'background-image' property", () => {
      expect(cardElement).toHaveComputedStyle({
        'background-image': `url("${testUrl}")`,
      });
    });

    it('should have correct defaults for properties related to background', () => {
      expect(cardElement).toHaveComputedStyle({
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%',
        'background-size': 'cover',
      });
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
      await TestHelper.whenReady(ionBadgeElement);
      expect(ionBadgeElement).toHaveClass('ios', ionicGlobalMode);
    });
  });
});
