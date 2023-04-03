import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CarouselComponent } from './carousel.component';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';

describe('CarouselComponent', () => {
  let spectator: SpectatorHost<CarouselComponent>;

  const createHost = createHostFactory({
    component: CarouselComponent,
    imports: [TestHelper.ionicModuleForTest],
    declarations: [CarouselSlideComponent],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-carousel>
        <kirby-carousel-slide> Slide 1 </kirby-carousel-slide>
        <kirby-carousel-slide> Slide 2 </kirby-carousel-slide>
        <kirby-carousel-slide> Slide 3 </kirby-carousel-slide>
      </kirby-carousel>`);
    });

    it('should create', () => {
      console.log(spectator.fixture.nativeElement);
      expect(spectator.component).toBeTruthy();
    });
  });
});
