import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ColorHelper, DesignTokenHelper, ThemeColorExtended } from '@kirbydesign/core';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { customElementsInitializer } from '../../custom-elements-initializer';
import { BadgeComponent } from '../../index';

const { getColor, fontSize, size } = DesignTokenHelper;

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

      ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it("should have size 'md'", () => {
      expect(spectator.component.size).toBe('md');
    });

    it('should have correct font-size', () => {
      expect(ionBadge).toHaveComputedStyle({ 'font-size': fontSize('xxs') });
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        'min-width': size('s'),
        'min-height': size('s'),
        'padding-bottom': '3px',
        'padding-top': '3px',
        'padding-inline-start': '5px',
        'padding-inline-end': '5px',
      });
    });

    it('should have correct color', () => {
      expect(ionBadge).toHaveComputedStyle({
        'background-color': getColor('white'),
        color: getColor('white', 'contrast'),
      });
    });

    describe('when custom css properties are set', () => {
      it('should set correct color', () => {
        spectator.element.style.setProperty('--kirby-badge-background-color', 'pink');
        spectator.element.style.setProperty('--kirby-badge-color', 'chartreuse');

        expect(ionBadge).toHaveComputedStyle({
          'background-color': 'pink',
          color: 'chartreuse',
        });
      });
    });
  });

  describe('when one character is slotted', () => {
    beforeEach(async () => {
      spectator = createHost('<kirby-badge></kirby-badge>', { props: { text: 'x' } });
      await TestHelper.whenReady(spectator.element);

      ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        'min-width': size('s'),
        'min-height': size('s'),
      });
    });
  });

  describe("when size is 'sm'", () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-badge [size]="'sm'">Slotted Text</kirby-badge>`);
      await TestHelper.whenReady(spectator.element);

      ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        width: size('xxs'),
        height: size('xxs'),
      });
    });

    it('should render without slotted text', () => {
      expect(spectator.element.innerText).toBe('');
    });
  });

  describe(`when rendering Badge with themeColor`, () => {
    const colors = ColorHelper.notificationColors;
    colors.forEach((color) => {
      it(`should render with correct colors when themeColor = '${color.name}'`, async () => {
        spectator = createHost(`
        <kirby-badge themeColor="${color.name}">
        </kirby-badge>
        `);

        await TestHelper.whenReady(spectator.element);
        spectator.element.style;

        ionBadge = spectator.element.shadowRoot.querySelector('ion-badge');
        await TestHelper.whenReady(ionBadge);

        const expectedTextColor =
          color.name === 'danger'
            ? getColor('white')
            : getColor(color.name as ThemeColorExtended, 'contrast');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor(color.name as ThemeColorExtended),
          color: expectedTextColor,
        });
      });
    });
  });
});
