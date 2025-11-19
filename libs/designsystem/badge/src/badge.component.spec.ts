import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from './badge.component';

const { getColor, fontSizeInPx, size } = DesignTokenHelper;
const customElevation =
  'rgba(28, 28, 28, 0.3) 0px 20px 30px -15px, rgba(28, 28, 28, 0.12) 0px 0px 5px 0px';

xdescribe('BadgeComponent', () => {
  let spectator: SpectatorHost<BadgeComponent>;
  let ionBadge: HTMLIonBadgeElement;

  const createHost = createHostFactory({
    component: BadgeComponent,
    imports: [TestHelper.ionicModuleForTest, IconComponent],
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

    it('should have correct font-size', () => {
      expect(ionBadge).toHaveComputedStyle({ 'font-size': fontSizeInPx('xxs') });
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        'min-width': size('s'),
        'padding-bottom': '0px',
        'padding-top': '0px',
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
      spectator = createHost('<kirby-badge [text]="text"></kirby-badge>', {
        hostProps: { text: 'x' },
      });
      ionBadge = spectator.element.querySelector('ion-badge');
      await TestHelper.whenReady(ionBadge);
    });

    it('should be rendered with correct dimensions', () => {
      expect(ionBadge).toHaveComputedStyle({
        'min-width': size('s'),
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
    describe('Badge with text', () => {
      beforeEach(async () => {
        spectator = createHost(
          `
        <kirby-badge [size]="'md'" [themeColor]="themeColor">
          Text
        </kirby-badge>
        `,
          {
            hostProps: { themeColor: 'success' },
          }
        );
        ionBadge = spectator.element.querySelector('ion-badge');
        await TestHelper.whenReady(ionBadge);
      });
      it('should have success tint background when themeColor = "success"', async () => {
        spectator.setHostInput('themeColor', 'success');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('success', 'tint'),
          color: getColor('success', 'contrast'),
        });
      });

      it('should have warning background when themeColor = "warning"', async () => {
        spectator.setHostInput('themeColor', 'warning');

        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('warning'),
          color: getColor('warning', 'contrast'),
        });
      });

      it('should have danger shade background when themeColor = "danger"', async () => {
        spectator.setHostInput('themeColor', 'danger');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('danger', 'shade'),
          color: getColor('white'),
        });
      });
    });

    describe('Badge with icon', () => {
      beforeEach(async () => {
        spectator = createHost(
          `
        <kirby-badge [themeColor]="themeColor">
          <kirby-icon name="checkmark"></kirby-icon>
        </kirby-badge>
        `,
          {
            hostProps: { themeColor: 'success' },
          }
        );
        ionBadge = spectator.element.querySelector('ion-badge');
        await TestHelper.whenReady(ionBadge);
      });
      it('should have success tint background when themeColor = "success"', async () => {
        spectator.setHostInput('themeColor', 'success');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('success', 'tint'),
          color: getColor('success', 'contrast'),
        });
      });

      it('should have warning background when themeColor = "warning"', async () => {
        spectator.setHostInput('themeColor', 'warning');

        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('warning'),
          color: getColor('warning', 'contrast'),
        });
      });

      it('should have danger background when themeColor = "danger"', async () => {
        spectator.setHostInput('themeColor', 'danger');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('danger'),
          color: getColor('white'),
        });
      });
    });

    describe('Small badge', () => {
      beforeEach(async () => {
        spectator = createHost(
          `
        <kirby-badge [size]="'sm'" [themeColor]="themeColor"></kirby-badge>
        `,
          {
            hostProps: { themeColor: 'success' },
          }
        );
        ionBadge = spectator.element.querySelector('ion-badge');
        await TestHelper.whenReady(ionBadge);
      });
      it('should have success shade background when themeColor = "success"', async () => {
        spectator.setHostInput('themeColor', 'success');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('success', 'shade'),
        });
      });

      it('should have warning shade background when themeColor = "warning"', async () => {
        spectator.setHostInput('themeColor', 'warning');

        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('warning', 'shade'),
        });
      });

      it('should have danger background when themeColor = "danger"', async () => {
        spectator.setHostInput('themeColor', 'danger');
        expect(ionBadge).toHaveComputedStyle({
          'background-color': getColor('danger'),
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
