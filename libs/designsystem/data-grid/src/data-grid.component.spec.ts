import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DataGridComponent } from './data-grid.component';

describe('DataGridComponent', () => {
  let spectator: Spectator<DataGridComponent>;

  const createComponent = createComponentFactory({
    component: DataGridComponent,
    imports: [DataGridComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
