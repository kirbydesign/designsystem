import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { TabButtonComponent } from './tab-button.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabButtonComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: TabButtonComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
