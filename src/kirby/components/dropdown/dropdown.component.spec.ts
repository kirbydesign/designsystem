import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DropdownComponent } from './dropdown.component';

describe('ItemComponent', () => {
  let spectator: Spectator<DropdownComponent>;

  const createHost = createComponentFactory({
    imports: [],
    component: DropdownComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
