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

  describe('hide', () => {
    it('should hide tab bar', () => {
      spectator.component.hide();
      spectator.detectChanges();
      const ionTabBarElm = spectator.query('ion-tab-bar');

      expect(ionTabBarElm).toHaveComputedStyle({ display: 'none' });
    });
  });

  describe('show', () => {
    it('should show tab bar', () => {
      spectator.component.show();
      spectator.detectChanges();

      const ionTabBarElm = spectator.query('ion-tab-bar');
      expect(ionTabBarElm).toHaveComputedStyle({ display: 'none' });
    });
  });
});
