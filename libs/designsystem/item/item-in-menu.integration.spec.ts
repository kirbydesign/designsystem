import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { MenuComponent } from '../menu';
import { ItemModule } from './src';

describe('ItemComponent in a MenuComponent', () => {
  let spectator: SpectatorHost<MenuComponent>;

  const createHost = createHostFactory({
    imports: [MockModule(IconModule), ItemModule],
    providers: [provideIonicAngular()],
    component: MenuComponent,
  });

  describe('when default', () => {
    beforeEach(() => {
      spectator = createHost(`
      <kirby-menu>
        <kirby-item>Value</kirby-item>
      </kirby-menu>
      `);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have size sm as default', () => {
      spectator.detectChanges();
      const ionItem = spectator.query('ion-item');

      expect(ionItem).toBeTruthy();
      expect(ionItem).toHaveComputedStyle({
        '--min-height': '44px',
      });
    });
  });

  describe(`when item size is md`, () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-menu><kirby-item size="md">Value</kirby-item></kirby-menu>`);
    });

    it(`should have ion-item '--min-height 56px'`, () => {
      spectator.detectChanges();
      const ionItem = spectator.query('ion-item');

      expect(ionItem).toBeTruthy();
      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--min-height': '56px',
      });
    });
  });

  describe(`when item size is xs`, () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-menu><kirby-item size="xs">Value</kirby-item></kirby-menu>`);
    });

    it(`should have ion-item '--min-height 32px'`, () => {
      spectator.detectChanges();
      const ionItem = spectator.query('ion-item');

      expect(ionItem).toBeTruthy();
      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--min-height': '32px',
      });
    });
  });
});
