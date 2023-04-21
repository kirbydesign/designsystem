import { createHostFactory } from '@ngneat/spectator';
import { MenuComponent } from 'menu/src';
import { ListItemComponent } from './list-item.component';

fdescribe('ListItemComponent', () => {
  let spectator: SpectatorHost<ListItemComponent>;

  const createHost = createHostFactory({
    component: ListItemComponent,
    imports: [MenuComponent],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-list-item></kirby-list-item>');
  });
});
