import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

describe('SkeletonLoaderComponent', () => {
  let spectator: SpectatorHost<SkeletonLoaderComponent>;
  const createHost = createHostFactory({
    component: SkeletonLoaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost(`<kirby-x-skeleton-loader></kirby-x-skeleton-loader>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
