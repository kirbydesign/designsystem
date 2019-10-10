import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockComponent, MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { TabButtonComponent } from './tab-button.component';
import { IconComponent } from '@kirbydesign/designsystem/components/icon/icon.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabButtonComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: TabButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
