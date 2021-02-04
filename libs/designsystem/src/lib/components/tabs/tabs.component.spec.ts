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

    // Only run test on non-touch devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
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
    }
  });

  describe('Tab-bar height', () => {
    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    describe('on screensize phone', () => {
      beforeEach(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      it('should be 50px', () => {
        const ionTabBarElm = spectator.query('ion-tab-bar');
        expect(ionTabBarElm).toHaveComputedStyle({
          height: '50px',
        });
      });
    });

    describe('on screensize tablet', () => {
      beforeEach(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
      });

      it('should be 70px', () => {
        const ionTabBarElm = spectator.query('ion-tab-bar');
        expect(ionTabBarElm).toHaveComputedStyle({
          height: '70px',
        });
      });
    });

    describe('on screensize desktop', () => {
      beforeEach(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      it('should be 70px', () => {
        const ionTabBarElm = spectator.query('ion-tab-bar');
        expect(ionTabBarElm).toHaveComputedStyle({
          height: '70px',
        });
      });
    });
  });
});
