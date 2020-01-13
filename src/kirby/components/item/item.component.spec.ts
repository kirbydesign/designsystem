import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let spectator: Spectator<ItemComponent>;

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
