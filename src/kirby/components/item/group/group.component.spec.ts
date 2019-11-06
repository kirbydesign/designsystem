import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ItemGroupComponent } from './group.component';

describe('ItemGroupComponent', () => {
  let spectator: Spectator<ItemGroupComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemGroupComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
