import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ColorHelper, DesignTokenHelper, ThemeColorExtended } from '@kirbydesign/core';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '@kirbydesign/designsystem/icon';

import {
  ProgressCircleComponent,
  ProgressCircleRingComponent,
} from '@kirbydesign/designsystem/progress-circle';
import { AvatarComponent } from './avatar.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;
const avatarSize = DesignTokenHelper.avatarSize;

describe('AvatarComponent', () => {
  let spectator: SpectatorHost<AvatarComponent>;

  const createHost = createHostFactory({
    component: AvatarComponent,
    declarations: [IconComponent],
    imports: [TestHelper.ionicModuleForTest, ProgressCircleComponent, ProgressCircleRingComponent],
  });

  it('should create', () => {
    spectator = createHost(`
    <kirby-avatar size="lg" overlay="true">
      <kirby-icon name="qr"></kirby-icon>
    </kirby-avatar>
    `);
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct default colors', async () => {
    spectator = createHost(`
    <kirby-avatar>
      <kirby-icon name="qr"></kirby-icon>
    </kirby-avatar>
    `);

    const avatar = spectator.queryHost<HTMLElement>('.avatar');
    expect(avatar).toHaveComputedStyle({
      'background-color': getColor('white'),
      color: getColor('light', 'contrast'),
    });
  });

  it('should emit error when rendering avatar with invalid image source', async () => {
    spectator = createHost(`
      <kirby-avatar imageSrc="failingSrc.png"></kirby-avatar>
    `);
    spyOn(spectator.component.imgError, 'emit');

    let errorEvent: ErrorEvent;
    const img = spectator.query<HTMLImageElement>('img');
    const waitForImageError = new Promise<HTMLImageElement>((resolve) => {
      img.addEventListener('error', (ev) => {
        errorEvent = ev;
        resolve(img);
      });
    });
    await waitForImageError;

    expect(spectator.component.imgError.emit).toHaveBeenCalledOnceWith(errorEvent);
  });

  describe('when rendering Avatar within Progress Circle', () => {
    it(`should have correct size when Progress Circle size = 'sm'`, async () => {
      spectator = createHost(`
      <kirby-progress-circle size="sm">
        <kirby-avatar>
          <kirby-icon name="qr"></kirby-icon>
        </kirby-avatar>
      </kirby-progress-circle>
      `);

      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: avatarSize('s'), height: avatarSize('s') });
      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it(`should have correct size when size = 'sm'`, () => {
      spectator = createHost(`<kirby-avatar size="sm"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: avatarSize('s'), height: avatarSize('s') });
    });

    it(`should have correct size when size = 'md'`, () => {
      spectator = createHost(`<kirby-avatar size="md"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: avatarSize('m'), height: avatarSize('m') });
    });

    it(`should have correct size when size = 'lg'`, () => {
      spectator = createHost(`<kirby-avatar size="lg"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: avatarSize('l'), height: avatarSize('l') });
    });
  });

  describe('when rendering Avatar with icon', () => {
    it(`icon should have correct size when Avatar size = 'sm'`, async () => {
      spectator = createHost(`
      <kirby-avatar size="sm" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it(`icon should have correct size when Avatar size = 'md'`, async () => {
      spectator = createHost(`
      <kirby-avatar size="md" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('l'), height: size('l') });
    });

    it(`icon should have correct size when Avatar size = 'lg'`, async () => {
      spectator = createHost(`
      <kirby-avatar size="lg" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('xxxl'), height: size('xxxl') });
    });
  });

  describe('when rendering Avatar within Progress Circle', () => {
    it(`should have correct size when Progress Circle size = 'sm'`, async () => {
      spectator = createHost(`
      <kirby-progress-circle size="sm">
        <kirby-avatar>
          <kirby-icon name="qr"></kirby-icon>
        </kirby-avatar>
      </kirby-progress-circle>
      `);

      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: avatarSize('s'), height: avatarSize('s') });
      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it(`should have correct size when Progress Circle size = 'md'`, async () => {
      spectator = createHost(`
      <kirby-progress-circle size="md">
        <kirby-avatar>
          <kirby-icon name="qr"></kirby-icon>
        </kirby-avatar>
      </kirby-progress-circle>
      `);

      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: avatarSize('m'), height: avatarSize('m') });
      expect(ionIcon).toHaveComputedStyle({ width: size('l'), height: size('l') });
    });

    it(`should have correct size when Progress Circle size = 'lg'`, async () => {
      spectator = createHost(`
      <kirby-progress-circle size="lg">
        <kirby-avatar>
          <kirby-icon name="qr"></kirby-icon>
        </kirby-avatar>
      </kirby-progress-circle>
      `);

      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenReady(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: avatarSize('l'), height: avatarSize('l') });
      expect(ionIcon).toHaveComputedStyle({ width: size('xxxl'), height: size('xxxl') });
    });
  });

  describe(`when rendering Avatar with themeColor`, () => {
    const colors = [
      ...ColorHelper.notificationColors,
      ...ColorHelper.brandColors,
      DesignTokenHelper.getColor('medium'),
      DesignTokenHelper.getColor('white'),
      DesignTokenHelper.getColor('dark'),
      DesignTokenHelper.getColor('light'),
      DesignTokenHelper.getColor('semi-light'),
    ];
    colors.forEach((color) => {
      it(`should render with correct colors when themeColor = '${color.name}'`, async () => {
        spectator = createHost(`
        <kirby-avatar themeColor="${color.name}">
          <kirby-icon name="qr"></kirby-icon>
        </kirby-avatar>
        `);

        const avatar = spectator.queryHost<HTMLElement>('.avatar');
        expect(avatar).toHaveComputedStyle({
          'background-color': getColor(color.name as ThemeColorExtended),
          color: getColor(color.name as ThemeColorExtended, 'contrast'),
        });
      });
    });
  });
});
