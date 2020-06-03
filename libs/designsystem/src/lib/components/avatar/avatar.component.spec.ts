import { IonicModule } from '@ionic/angular';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper, ThemeColorExtended } from '../../helpers/design-token-helper';

import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from './avatar.component';
import { SizeDirective } from '../../directives/size/size.directive';
import { ThemeColorDirective } from '../../directives';
import { ColorHelper } from '../../helpers';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;

describe('AvatarComponent', () => {
  let spectator: SpectatorHost<AvatarComponent>;

  const createHost = createHostFactory({
    component: AvatarComponent,
    declarations: [IconComponent, SizeDirective, ThemeColorDirective],
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

  it('should render with correct colors', async () => {
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

  describe('when rendering avatar with icon', () => {
    it('icon size should be small when avatar is small', async () => {
      spectator = createHost(`
      <kirby-avatar [size]="sm" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenHydrated(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m') });
    });

    it('icon size should be medium when avatar is medium', async () => {
      spectator = createHost(`
      <kirby-avatar [size]="'md'" overlay="true">
        <kirby-icon name="qr"></kirby-icon>
      </kirby-avatar>
      `);

      const ionIcon = spectator.queryHost<HTMLElement>('ion-icon');
      await TestHelper.whenHydrated(ionIcon);

      expect(ionIcon).toHaveComputedStyle({ width: size('l'), height: size('l') });
    });

    it('icon size should be large when avatar is large', async () => {
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

  const colors = [...ColorHelper.mainColors, { name: 'white', value: '#ffffff' }];
  colors.forEach((color) => {
    describe(`when rendering avatar with themeColor = ${color.name}`, () => {
      it('should render with correct colors', async () => {
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
