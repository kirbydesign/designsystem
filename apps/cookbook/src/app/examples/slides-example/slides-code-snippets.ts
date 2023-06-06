export const slidesDefaultConfig = `defaultConfig: KirbySwiperOptions = {
  spaceBetween: 16,
  pagination: {
    el: '.pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: 'swiper-button-prev',
    prevEl: 'swiper-button-next',
  },
  on: {
    slideChange: (swiper) => {
      this.selectedSlide.emit({
        slide: this.slides[swiper.activeIndex],
        index: swiper.activeIndex,
      });
    },
  },
}`;

export const exampleComponentHTML = `<kirby-slides
[slidesOptions]="customConfig"
[ignorePagePadding]="ignorePagePadding"
[slides]="slides"
(selectedSlide)="getDataFromActiveSlide($event)"
>
<kirby-card *kirbyCarouselSlide="let slide; let i = index" [hasPadding]="true">
  <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
  <div class="card-content">
	 {{ slide.cardContent }}
  </div>
</kirby-card>
</kirby-slides>`;

export const customConfigExample = `customConfig: KirbySwiperOptions = {
  slidesPerView: 1.2,
  centeredSlides: true,
  slidesPerGroup: 1,
  breakpoints: {
    992: {
      centeredSlides: false,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
}`;
