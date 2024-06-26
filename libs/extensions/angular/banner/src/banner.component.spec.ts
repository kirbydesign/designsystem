import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let spectator: SpectatorHost<BannerComponent>;
  const createHost = createHostFactory({
    component: BannerComponent,
  });

  beforeEach(async () => {
    spectator = createHost(`<kirby-x-banner></kirby-x-banner>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
