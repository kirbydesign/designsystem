import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

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

  describe('tabBarBottomHidden: true', () => {
    it('should hide tab bar', () => {
      spectator.component.tabBarBottomHidden = true;
      spectator.detectChanges();
      const ionTabBarElm = spectator.query('ion-tab-bar');

      expect(ionTabBarElm).toHaveComputedStyle({ display: 'none' });
    });
    it('should NOT set page footer safe area override if tab bar bottom is hidden', () => {
      spectator.component.tabBarBottomHidden = true;
      spectator.detectChanges();
      const ionTabBarElm = spectator.query('ion-tab-bar');

      expect(ionTabBarElm).toHaveComputedStyle({ '--kirby-page-footer-safe-area-bottom': '' });
    });
  });

  describe('tabBarBottomHidden: false', () => {
    it('should show tab bar', () => {
      spectator.component.tabBarBottomHidden = false;
      spectator.detectChanges();

      const ionTabBarElm = spectator.query('ion-tab-bar');
      expect(ionTabBarElm).not.toHaveComputedStyle({ display: 'none' });
    });
    it('should set footer safe area to 0 when tab bar is shown and in bottom', () => {
      spectator.component.tabBarBottomHidden = false;
      spectator.detectChanges();

      const ionTabBarElm = spectator.query('ion-tab-bar');
      expect(ionTabBarElm).toHaveComputedStyle({ '--kirby-page-footer-safe-area-bottom': '' });
    });
  });
});
