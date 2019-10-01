import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabsComponent>;

  const createHost = createTestComponentFactory({
    component: TabsComponent,
    declarations: [MockComponent(ionic.IonToolbar), MockComponent(ionic.IonTitle)],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
