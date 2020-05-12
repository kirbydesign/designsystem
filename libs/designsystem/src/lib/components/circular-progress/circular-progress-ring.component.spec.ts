import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CircularProgressComponent } from './circular-progress.component';

describe('CircularProgressRingComponent', () => {
  let spectator: Spectator<CircularProgressComponent>;

  const createHost = createComponentFactory({
    component: CircularProgressComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({ props: { value: 30 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
