import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CardModule } from '@kirbydesign/designsystem/card';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { KirbySwiperOptions, SlidesComponent } from './slides.component';
import { SlideDirective } from './slide.directive';
import { SlideStretchHeightDirective } from './slide-stretch-height.directive';

const { getColor } = DesignTokenHelper;

describe('SlidesComponent', () => {
  let spectator: SpectatorHost<SlidesComponent>;

  const customOptions: KirbySwiperOptions = {
    slidesPerView: 1.2,
    slidesPerGroup: 1,
    spaceBetween: 8,
    breakpoints: {
      0: {
        centeredSlides: true,
        slidesPerView: 1.2,
        slidesPerGroup: 1,
      },
    },
  };

  const createHost = createHostFactory({
    component: SlidesComponent,
    imports: [TestHelper.ionicModuleForTest, ButtonComponent, IconModule, CardModule],
    declarations: [SlideDirective, SlideStretchHeightDirective],
  });

  const hostTemplate = `<kirby-slides [slides]="slides" [slidesOptions]="slidesOptions" [title]="'Title'" [showNavigation]="true">
                          <kirby-card *kirbySlide="let slide">
                            {{ slide }}
                          </kirby-card>
                        </kirby-slides>`;
  const props = {
    hostProps: {
      slides: [0, 1, 2, 3, 4],
      slidesOptions: customOptions,
    },
  };

  it('should create', () => {
    spectator = createHost(hostTemplate, props);
    expect(spectator.component).toBeTruthy();
  });

  it('should have correct title', () => {
    spectator = createHost(hostTemplate, props);
    expect(spectator.query('.kirby-text-medium')).toHaveExactTrimmedText('Title');
  });

  it('should contain 5 slides', () => {
    spectator = createHost(hostTemplate, props);
    expect(spectator.queryAll('swiper-slide')).toHaveLength(5);
  });

  it('should update the active slide index, when calling slideTo ', () => {
    spectator = createHost(hostTemplate, props);
    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(0);

    spectator.component.slideTo(2);

    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(2);
  });

  it('should emit slideChange when the active slide is changed', () => {
    spectator = createHost(hostTemplate, props);
    const slideChangeSpy = spyOn(spectator.component.slideChange, 'emit');

    expect(slideChangeSpy).not.toHaveBeenCalled();

    spectator.component.slideTo(3);

    expect(slideChangeSpy).toHaveBeenCalledWith({ slide: 3, index: 3 });
  });

  it('should disable the previous button, when the active slide is the first slide', () => {
    spectator = createHost(hostTemplate, props);
    const previousButton = spectator.query('.swiper-button-prev');

    expect(previousButton.classList).toContain('swiper-button-disabled');
    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(0);

    spectator.component.slideTo(1);

    expect(previousButton.classList).not.toContain('swiper-button-disabled');
    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(1);
  });

  it('should disable the next button, when the active slide is the last slide', () => {
    spectator = createHost(hostTemplate, props);
    const nextButton = spectator.query('.swiper-button-next');

    expect(nextButton.classList).not.toContain('swiper-button-disabled');
    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(0);

    spectator.component.slideTo(4);

    expect(nextButton.classList).toContain('swiper-button-disabled');
    expect(spectator.component.swiperContainer.nativeElement.swiper.activeIndex).toBe(4);
  });

  it('should hide the navigation buttons, if the Slider doesn´t contain enough slides for sliding', () => {
    spectator = createHost(hostTemplate, props);
    spectator.setInput('slides', [0]);

    // It is necessary to update the Slides container, because it does not updated automatically when the "slides" input changes
    spectator.component.swiperContainer.nativeElement.swiper.update();

    expect(spectator.query('.swiper-button-prev')).toBeHidden();
    expect(spectator.query('.swiper-button-next')).toBeHidden();
  });

  describe('pagination', () => {
    let paginationDots;

    beforeEach(() => {
      spectator = createHost(hostTemplate, props);
      paginationDots = spectator.queryAll('.swiper-pagination-bullet');
    });

    it('should have pagination dots with a custom border-radius', () => {
      paginationDots.forEach((paginationDot) => {
        expect(paginationDot).toHaveComputedStyle({
          'border-radius': '3px',
        });
      });
    });

    it('should have pagination dots with a custom height', () => {
      paginationDots.forEach((paginationDot) => {
        expect(paginationDot).toHaveComputedStyle({
          height: '6px',
        });
      });
    });

    it('should have pagination dots with a custom width', () => {
      paginationDots.forEach((paginationDot) => {
        expect(paginationDot).toHaveComputedStyle({
          width: '10px',
        });
      });
    });

    it('should have pagination dots with a custom background color', () => {
      paginationDots.forEach((paginationDot) => {
        expect(paginationDot).toHaveComputedStyle({
          'background-color': getColor('black'),
        });
      });
    });
  });

  it('should extend the default slides options with the provided slides options', () => {
    expect((spectator.component.swiperContainer.nativeElement.swiper as any).passedParams).toEqual(
      jasmine.objectContaining(customOptions)
    );
  });

  describe('when showNavigation=false', () => {
    beforeEach(() => {
      spectator = createHost(hostTemplate, props);
      spectator.component.showNavigation = false;
      spectator.detectComponentChanges();
    });

    it('should not render the navigation controls', () => {
      expect(spectator.query('.navigation-inner')).toBeNull();
    });

    it('should not render the navigation buttons', () => {
      expect(spectator.query('.swiper-button-prev')).toBeNull();
      expect(spectator.query('.swiper-button-next')).toBeNull();
    });

    it('should not render the pagination buttons', () => {
      expect(spectator.query('.pagination')).toBeNull();
    });
  });

  describe('on phone', () => {
    beforeAll(async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
    });

    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    it('should hide the navigation buttons', () => {
      spectator = createHost(hostTemplate, props);
      expect(spectator.query('.swiper-button-prev')).toBeHidden();
      expect(spectator.query('.swiper-button-next')).toBeHidden();
    });
  });

  describe('on touch device', () => {
    beforeEach(() => {
      spectator = createHost(hostTemplate, props);
      spectator.component._isTouch = true;
      spectator.detectComponentChanges();
    });

    it('should not render the navigation buttons', () => {
      expect(spectator.query('.swiper-button-prev')).toBeNull();
      expect(spectator.query('.swiper-button-next')).toBeNull();
    });

    it('should render the pagination buttons', () => {
      expect(spectator.query('.pagination')).toBeTruthy();
      expect(spectator.query('.pagination')).toBeVisible();
    });
  });

  const stretchProps = {
    hostProps: {
      slides: [
        { title: 'Title', height: 50, content: 0 },
        { title: 'Title', height: 150, content: 1 },
        { title: 'Title', height: 40, content: 2 },
        { title: 'Title', height: 25, content: 3 },
        { title: 'Title', height: 50, content: 4 },
      ],
      slidesOptions: customOptions,
    },
  };

  describe('slides with slideStretchHeight directive', () => {
    it('should have equal height', () => {
      spectator = createHost(
        `<kirby-slides [slides]="slides" [slidesOptions]="slidesOptions" [title]="'Title'" [showNavigation]="true">
        <kirby-card *kirbySlide="let slide" slideStretchHeight>
        <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
        <div class="card-content" [style.height.px]="slide.height">
          {{slide.content}}
        </div>
        </kirby-card>
      </kirby-slides>`,
        stretchProps
      );
      const slides = spectator.queryAll('swiper-slide');
      expect(
        slides.every(
          (slide) =>
            window.getComputedStyle(slide).height === window.getComputedStyle(slides[0]).height
        )
      ).toBeTruthy();
    });
  });
  describe('slides without slideStretchHeight directive', () => {
    it('should not have equal height', () => {
      spectator = createHost(
        `<kirby-slides [slides]="slides" [slidesOptions]="slidesOptions" [title]="'Title'" [showNavigation]="true">
          <kirby-card *kirbySlide="let slide">
          <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
          <div class="card-content" [style.height.px]="slide.height">
            {{slide.content}}
          </div>
          </kirby-card>
        </kirby-slides>`,
        stretchProps
      );

      const slides = spectator.queryAll('swiper-slide');
      expect(
        slides.every(
          (slide) =>
            window.getComputedStyle(slide).height === window.getComputedStyle(slides[0]).height
        )
      ).toBeFalsy();
    });
  });
});
