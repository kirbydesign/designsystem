import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { ImageBannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let spectator: SpectatorHost<ImageBannerComponent>;
  const createHost = createHostFactory({
    component: ImageBannerComponent,
  });

  beforeEach(async () => {
    spectator = createHost(`<kirby-x-image-banner></kirby-x-image-banner>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
