import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ItemOptionsComponent } from './options.component';

describe('ItemOptionsComponent', () => {
  let spectator: Spectator<ItemOptionsComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemOptionsComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
