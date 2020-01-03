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

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
