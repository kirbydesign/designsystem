import { IonicModule } from '@ionic/angular';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper, ThemeColorExtended } from '../../helpers/design-token-helper';

import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from './avatar.component';
import { SizeDirective } from '../../directives/size/size.directive';
import { ThemeColorDirective } from '../../directives';
import { ColorHelper } from '../../helpers';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;

describe('AvatarComponent', () => {
  let spectator: SpectatorHost<AvatarComponent>;

  const createHost = createHostFactory({
    component: AvatarComponent,
    declarations: [IconComponent, SizeDirective, ThemeColorDirective, ProgressCircleComponent],
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
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
      'background-color': getColor('light'),
      color: getColor('light', 'contrast'),
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
      await TestHelper.whenHydrated(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: '40px', height: '40px' });
      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it(`should have correct size when size = 'sm'`, () => {
      spectator = createHost(`<kirby-avatar size="sm"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: '40px', height: '40px' });
    });

    it(`should have correct size when size = 'md'`, () => {
      spectator = createHost(`<kirby-avatar size="md"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: '56px', height: '56px' });
    });

    it(`should have correct size when size = 'lg'`, () => {
      spectator = createHost(`<kirby-avatar size="lg"></kirby-avatar>`);
      const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: '96px', height: '96px' });
    });
  });

  describe('when rendering Avatar with icon', () => {
    it(`icon should have correct size when Avatar size = 'sm'`, async () => {
      spectator = createHost(`
      <kirby-avatar [size]="sm" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenHydrated(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it(`icon should have correct size when Avatar size = 'md'`, async () => {
      spectator = createHost(`
      <kirby-avatar [size]="'md'" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenHydrated(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('l'), height: size('l') });
    });

    it(`icon should have correct size when Avatar size = 'lg'`, async () => {
      spectator = createHost(`
      <kirby-avatar size="lg" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenHydrated(ionIcon);

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
      await TestHelper.whenHydrated(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: '40px', height: '40px' });
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
      await TestHelper.whenHydrated(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: '56px', height: '56px' });
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
      await TestHelper.whenHydrated(ionIcon);

      expect(avatar).toHaveComputedStyle({ width: '96px', height: '96px' });
      expect(ionIcon).toHaveComputedStyle({ width: size('xxxl'), height: size('xxxl') });
    });
  });

  describe(`when rendering Avatar with themeColor`, () => {
    const colors = [...ColorHelper.mainColors, { name: 'white', value: '#ffffff' }];
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
