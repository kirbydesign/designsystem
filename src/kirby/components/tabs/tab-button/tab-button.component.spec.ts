import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { TabButtonComponent } from './tab-button.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabButtonComponent>;

  const createHost = createTestComponentFactory({
    component: TabButtonComponent,
    declarations: [MockComponent(ionic.IonToolbar), MockComponent(ionic.IonTitle)],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
