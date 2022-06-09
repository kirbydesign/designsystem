import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { ItemResponsiveComponent } from './item-responsive.component';

describe('ItemResponsiveComponent', () => {
  let spectator: Spectator<ItemResponsiveComponent>;

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ItemResponsiveComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
