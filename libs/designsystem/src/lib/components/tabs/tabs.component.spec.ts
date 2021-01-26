import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { TestHelper } from '../../testing/test-helper';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabsComponent>;

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule)],
    component: TabsComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  describe('tabBarBottomHidden', () => {
    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    describe('on screensize phone', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      describe('tabBarBottomHidden: true', () => {
        beforeEach(() => {
          spectator.component.tabBarBottomHidden = true;
          spectator.detectChanges();
        });

        it('should hide tab bar', async () => {
          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).toHaveComputedStyle({ display: 'none' });
        });

        it('should NOT set page footer safe area override', async () => {
          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).toHaveComputedStyle({
            '--kirby-page-footer-safe-area-bottom': '',
          });
        });
      });

      describe('tabBarBottomHidden: false', () => {
        beforeEach(() => {
          spectator.component.tabBarBottomHidden = false;
          spectator.detectChanges();
        });

        it('should show tab bar', () => {
          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).not.toHaveComputedStyle({ display: 'none' });
        });

        it('should set footer safe area to 0', () => {
          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).toHaveComputedStyle({
            '--kirby-page-footer-safe-area-bottom': '0px',
          });
        });
      });
    });

    describe('on screensize large', () => {
      beforeEach(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      describe('tabBarBottomHidden: true', () => {
        it('should NOT hide tab bar when tabBarBottomHidden', async () => {
          spectator.component.tabBarBottomHidden = true;
          spectator.detectChanges();

          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).not.toHaveComputedStyle({ display: 'none' });
        });
      });

      describe('tabBarBottomHidden: false', () => {
        it('should NOT set page footer safe area override', async () => {
          spectator.component.tabBarBottomHidden = false;
          spectator.detectChanges();

          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).toHaveComputedStyle({
            '--kirby-page-footer-safe-area-bottom': '',
          });
        });
      });
    });
  });
});
