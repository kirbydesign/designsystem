import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ItemSlidingComponent } from './sliding.component';

describe('ItemSlidingComponent', () => {
  let spectator: Spectator<ItemSlidingComponent>;

  const createHost = createTestComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemSlidingComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
