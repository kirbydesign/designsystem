import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { SpotIllustrationComponent } from './spot-illustration.component';

describe('SpotIllustrationComponent', () => {
  let spectator: SpectatorHost<SpotIllustrationComponent>;
  const createHost = createHostFactory({
    component: SpotIllustrationComponent,
  });

  beforeEach(async () => {
    spectator = createHost(
      `<kirby-x-spot-illustration name="box-curve"></kirby-x-spot-illustration>`
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
