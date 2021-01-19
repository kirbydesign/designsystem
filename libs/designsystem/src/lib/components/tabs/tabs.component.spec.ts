import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

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

  describe('hide', () => {
    it('should hide tab bar', () => {
      spectator.component.hide();
      spectator.detectChanges();

      const ionTabBarElm = spectator.query('ion-tab-bar');
      spectator.detectChanges();

      const ionTabBarElmStyle = getComputedStyle(ionTabBarElm);
      expect(ionTabBarElmStyle.display).toBe('none');
    });
  });

  describe('show', () => {
    it('should show tab bar', () => {
      spectator.component.show();
      spectator.detectChanges();

      const ionTabBarElm = spectator.query('ion-tab-bar');
      const ionTabBarElmStyle = getComputedStyle(ionTabBarElm);
      expect(ionTabBarElmStyle.display).not.toBe('none');
    });
  });
});
