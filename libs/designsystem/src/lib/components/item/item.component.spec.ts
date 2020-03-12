import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { IconModule } from '../icon/icon.module';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let spectator: Spectator<ItemComponent>;

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule), MockModule(IconModule)],
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
