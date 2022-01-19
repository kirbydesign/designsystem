import { IonItem, IonList } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ItemComponent } from '../../item';

import { ListExperimentalComponent } from './list-experimental.component';

describe('ListExperimental', () => {
  let spectator: SpectatorHost<ListExperimentalComponent>;

  const createHost = createHostFactory({
    component: ListExperimentalComponent,
    declarations: [
      ListExperimentalComponent,
      MockComponent(IonList),
      MockComponent(IonItem),
      MockComponent(ItemComponent),
    ],
  });

  beforeEach(() => {
    spectator = createHost<ListExperimentalComponent>(`
      <kirby-list-experimental>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
      </kirby-list-experimental>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render items in list', () => {
    const items = spectator.queryHostAll('kirby-item');

    expect(items).toHaveLength(4);
  });
});
