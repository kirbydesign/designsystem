import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const desktopBreakpoint = parseInt(DesignTokenHelper.breakpoints.medium) - 1;
const spaceBetween = parseInt(DesignTokenHelper.size('s'));
const transitionDuration = parseInt(DesignTokenHelper.transitionDuration('long'));

export const slidesDefaultConfig = `defaultConfig: KirbySwiperOptions = {
  centeredSlides: true,
  centeredSlidesBounds: true,
  slidesPerView: 1.2,
  slidesPerGroup: 1,
  breakpoints: {
    ${desktopBreakpoint}: {
      centeredSlides: false,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
  spaceBetween: ${spaceBetween},
  speed: ${transitionDuration},
  pagination: {
    el: '.pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-prev',
    prevEl: '.swiper-button-next',
  },
  on: {
    slideChange: (swiper) => {
      this.slideChange.emit({
        slide: this.slides[swiper.activeIndex],
        index: swiper.activeIndex,
      });
    },
  },
};`;

export const defaultExampleComponentHTML = `<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div>{{ slide.cardContent }}</div>
  </kirby-card>
</kirby-slides>`;

export const heightExampleComponentHTML = `<kirby-slides [slides]="slides" [title]="'Title'" [showNavigation]="true">
<kirby-card *kirbySlide="let slide; let i = index" slideStretchHeight [hasPadding]="true">
  <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
  <div class="card-content">
    {{ slide.cardContent }}
  </div>
</kirby-card>
</kirby-slides>`;

export const heightExampleComponentCSS = `kirby-card {
  justify-content: start;
}`;

export const advancedExampleComponentHTML = `<kirby-slides
  [slides]="slides"
  (slideChange)="getDataFromActiveSlide($event)"
  [slidesOptions]="customConfig"
  [showNavigation]="true"
  [title]="'Title'"
  #slidesInstance>

  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div>{{ slide.cardContent }}</div>
  </kirby-card>

  <button kirby-button attentionLevel="3" size="xs" (click)="showAll()">See all</button>

</kirby-slides>

<button kirby-button (click)="slidesInstance.slideTo(3)" style="display: block; margin: 24px auto 0">
  Activate slide no. 4
</button>`;

export const customConfigExample = `customConfig: KirbySwiperOptions = {
  slidesPerView: 1.1,
  breakpoints: {
    768: {
      centeredSlides: false,
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
  },
};`;
