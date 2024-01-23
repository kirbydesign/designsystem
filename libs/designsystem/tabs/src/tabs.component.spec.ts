import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { ScreenSize, TestHelper } from '@kirbydesign/designsystem/testing';
import { IonTabs, provideIonicAngular } from '@ionic/angular/standalone';
import { TabsComponent } from './tabs.component';

const { size } = DesignTokenHelper;

describe('TabsComponent', () => {
  let spectator: Spectator<TabsComponent>;
  const isNonTouchDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const createHost = createComponentFactory({
    imports: [IonTabs],
    providers: [provideIonicAngular({ mode: 'ios', _testing: true })],
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

        it('should set footer safe area to 0px', () => {
          const ionTabBarElm = spectator.query('ion-tab-bar');
          expect(ionTabBarElm).toHaveComputedStyle({
            '--kirby-page-footer-safe-area-bottom': '0px',
          });
        });
      });
    });

    // Only run test on non-touch devices
    if (isNonTouchDevice) {
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

  describe('tab-bar sizing', () => {
    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    const scenarios: { [key in ScreenSize]?: string } = {
      phone: '50px',
      tablet: '70px',
      desktop: '70px',
    };

    Object.entries(scenarios).forEach(([screenSize, expectedHeight]) => {
      it(`should have correct height on screensize ${screenSize}`, async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize[screenSize]);

        const ionTabBarElm = spectator.query('ion-tab-bar');
        expect(ionTabBarElm).toHaveComputedStyle({
          height: expectedHeight,
        });
      });
    });
  });

  describe('tab-bar spacing', () => {
    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    const scenarios: { [key in ScreenSize]?: string } = {
      phone: 'normal',
      tablet: size('m'),
      desktop: 'normal',
    };

    Object.entries(scenarios).forEach(([screenSize, expectedGap]) => {
      // Only run desktop test on non-touch devices
      if (screenSize === 'desktop' && !isNonTouchDevice) return;

      it(`should have correct spacing on screensize ${screenSize}`, async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize[screenSize]);

        const ionTabBarElm = spectator.query('ion-tab-bar');
        expect(ionTabBarElm).toHaveComputedStyle({
          'column-gap': expectedGap,
        });
      });
    });
  });
});
