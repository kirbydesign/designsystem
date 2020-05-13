import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProgressCircleComponent } from './progress-circle.component';

describe('ProgressCircleComponent', () => {
  let spectator: Spectator<ProgressCircleComponent>;

  const createHost = createComponentFactory({
    component: ProgressCircleComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createHost({ props: { value: 30 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
