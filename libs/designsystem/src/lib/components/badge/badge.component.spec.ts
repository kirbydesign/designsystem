import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { TestHelper } from 'src/lib/testing';
import { customElementsInitializer } from '../../custom-elements-initializer';
import { BadgeComponent } from '../../index';

describe('BadgeComponent', () => {
  let spectator: SpectatorHost<BadgeComponent>;
  let ionBadge: HTMLIonBadgeElement;

  const createHost = createHostFactory({
    component: BadgeComponent,
    imports: [TestHelper.ionicModuleForTest],
    providers: [customElementsInitializer()],
  });

  describe('by default', () => {
    beforeEach(async () => {
      spectator = createHost('<kirby-badge></kirby-badge>');
      await TestHelper.whenReady(spectator.element);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it("should have size 'md'", () => {
      expect(spectator.component.size).toBe('md');
    });

    it("should have 'md' class ", () => {
      expect(spectator.element).toHaveClass('md');
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

  describe("when size is 'sm'", () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-badge [size]="'sm'">Slotted Text</kirby-badge>`);
      await TestHelper.whenReady(spectator.element);

      ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it("should have the 'sm' class applied", () => {
      expect(spectator.element).toHaveClass('sm');
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        width: '8px',
        height: '8px',
      });
    });

    it('should render without slotted text', () => {
      expect(spectator.element.innerText).toBe('');
    });
  });
});
