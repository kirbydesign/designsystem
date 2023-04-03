import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CarouselSlideComponent } from './carousel-slide.component';

describe('CarouselSlideComponent', () => {
  let spectator: SpectatorHost<CarouselSlideComponent>;

  const createHost = createHostFactory({
    component: CarouselSlideComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-carousel-slide> Slide 1 </kirby-carousel-slide>`);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should not render the host element "kirby-carousel-slide"', () => {
      const hostElement = spectator.query('kirby-carousel-slide');
      expect(hostElement).toBeFalsy();
    });
  });
});
