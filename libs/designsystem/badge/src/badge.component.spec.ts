import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import {
  ColorHelper,
  DesignTokenHelper,
  ThemeColorExtended,
} from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { BadgeComponent } from './badge.component';

const { getColor, fontSize, size } = DesignTokenHelper;
const customElevation =
  'rgba(28, 28, 28, 0.3) 0px 20px 30px -15px, rgba(28, 28, 28, 0.12) 0px 0px 5px 0px';

describe('BadgeComponent', () => {
  let spectator: SpectatorHost<BadgeComponent>;
  let ionBadge: HTMLIonBadgeElement;

  const createHost = createHostFactory({
    component: BadgeComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('by default', () => {
    beforeEach(async () => {
      spectator = createHost('<kirby-badge></kirby-badge>');
      ionBadge = spectator.element.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it("should have size 'md'", () => {
      expect(spectator.component.size).toBe('md');
    });

    // FIXME: Refactor typography test
    xit('should have correct font-size', () => {
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

    it('should have custom elevation', () => {
      expect(ionBadge).toHaveComputedStyle({
        'box-shadow': customElevation,
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
      ionBadge = spectator.element.querySelector('ion-badge');
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
      ionBadge = spectator.element.querySelector('ion-badge');
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
    const colors = [
      ...ColorHelper.notificationColors,
      ColorHelper.systemColors.find((color) => color.name === 'white'),
    ];
    colors.forEach((color) => {
      it(`should render with correct colors when themeColor = '${color.name}'`, async () => {
        spectator = createHost(`
        <kirby-badge themeColor="${color.name}">
        </kirby-badge>
        `);
        ionBadge = spectator.element.querySelector('ion-badge');
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

    it(`should have custom elevation when themeColor = 'white'`, async () => {
      spectator = createHost(`
      <kirby-badge themeColor="white">
      </kirby-badge>
      `);
      ionBadge = spectator.element.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);

      expect(ionBadge).toHaveComputedStyle({
        'box-shadow': customElevation,
      });
    });
  });
});
