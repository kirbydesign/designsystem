import { IonicModule } from '@ionic/angular';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper } from '../../helpers/design-token-helper';

import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from './avatar.component';
import { SizeDirective } from '../../directives/size/size.directive';

const size = DesignTokenHelper.size;

describe('AvatarComponent', () => {
  let spectator: SpectatorHost<AvatarComponent>;

  const createHost = createHostFactory({
    component: AvatarComponent,
    declarations: [IconComponent, SizeDirective],
    imports: [IonicModule.forRoot()],
  });

  it('should create', () => {
    spectator = createHost(`
    <kirby-avatar size="lg" overlay="true">
      <kirby-icon name="qr"></kirby-icon>
    </kirby-avatar>
    `);
    expect(spectator.component).toBeTruthy();
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
});
