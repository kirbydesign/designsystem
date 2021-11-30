import { IonItemDivider } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ItemGroupHeaderComponent } from './item-group-header.component';

describe('ItemGroupHeaderComponent', () => {
  let spectator: SpectatorHost<ItemGroupHeaderComponent>;

  const createHost = createHostFactory({
    component: ItemGroupHeaderComponent,
    declarations: [ItemGroupHeaderComponent, MockComponent(IonItemDivider)],
  });

  beforeEach(() => {
    spectator = createHost<ItemGroupHeaderComponent>(`<kirby-item-group-header>
    </kirby-item-group-header>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
