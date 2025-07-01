import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { ImageBannerComponent } from './image-banner.component';

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

  it('should render custom heading content', () => {
    spectator = createHost(`
      <kirby-x-image-banner>
        <h2 title class="kirby-text-normal-bold">Custom Heading Example</h2>
      </kirby-x-image-banner>
    `);
    const heading = spectator.query('h2.kirby-text-normal-bold');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Custom Heading Example');
  });
});
