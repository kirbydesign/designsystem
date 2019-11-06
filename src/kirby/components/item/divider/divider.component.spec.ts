import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ItemDividerComponent } from './divider.component';

describe('ItemDividerComponent', () => {
  let spectator: Spectator<ItemDividerComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemDividerComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
