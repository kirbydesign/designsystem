import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ButtonComponent } from 'button/src';
import { IconModule } from 'icon/src';
import { CardModule } from 'card/src';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { fakeAsync, tick } from '@angular/core/testing';
import { CarouselComponent, SlidesOptions } from './carousel.component';
import { CarouselSlideDirective } from './carousel-slide.directive';

const { getColor } = DesignTokenHelper;

describe('CarouselComponent', () => {
  let spectator: SpectatorHost<CarouselComponent>;

  const customOptions: SlidesOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: false,
    spaceBetween: 8,
    slidesPerGroup: 1,
  };

  const createHost = createHostFactory({
    component: CarouselComponent,
    imports: [TestHelper.ionicModuleForTest, ButtonComponent, IconModule, CardModule],
    declarations: [CarouselSlideDirective],
  });

  beforeEach(async () => {
    spectator = createHost(
      `<kirby-carousel  [slides]="slides" [slidesOptions]="slidesOptions">
      <kirby-card *kirbyCarouselSlide="let slide">
          {{ slide }}
      </kirby-card>
    </kirby-carousel>`,
      {
        hostProps: {
          slides: [0, 1, 2, 3, 4],
          slidesOptions: customOptions,
        },
      }
    );

    await spectator.fixture.whenStable();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain 5 slides', () => {
    expect(spectator.queryAll('swiper-slide').length).toBe(5);
  });

  it('should update the active slide index, when calling slideTo ', () => {
    spectator.component.slideTo(2);

    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(2);
  });

  it('should emit selectedSlide when the active slide is changed', () => {
    const selectedSlideSpy = spyOn(spectator.component.selectedSlide, 'emit');

    spectator.component.slideTo(3);

    expect(selectedSlideSpy).toHaveBeenCalledWith({ slide: 3, index: 3 });
  });

  it('should disable the previous button, when the active slide is the first slide', () => {
    const previousButton = spectator.query('.swiper-button-prev');

    expect(previousButton.classList).toContain('swiper-button-disabled');

    spectator.component.slideTo(1);

    expect(previousButton.classList).not.toContain('swiper-button-disabled');
  });

  it('should disable the next button, when the active slide is the last slide', () => {
    const nextButton = spectator.query('.swiper-button-next');

    expect(nextButton.classList).not.toContain('swiper-button-disabled');

    spectator.component.slideTo(4);

    expect(nextButton.classList).toContain('swiper-button-disabled');
  });

  it('should have pagination dots with custom styling', fakeAsync(() => {
    const paginationDot = spectator.queryAll('.swiper-pagination-bullet')[0];
    tick(50);
    expect(paginationDot).toHaveComputedStyle({
      'border-radius': '2px',
      'background-color': getColor('black'),
      height: '6px',
      width: '10px',
    });
  }));

  it('should extend the default slides options with the provided slides options', () => {
    expect(spectator.component.swiperContainer.nativeElement.swiper.passedParams).toEqual(
      jasmine.objectContaining(customOptions)
    );
  });
});
