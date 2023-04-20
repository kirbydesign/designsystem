export const carouselDefaultConfig = `defaultConfig: SwiperOptions = {
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
}
`;

export const exampleComponentHTML = `<kirby-carousel
	[slidesOptions]="customConfig"
	[noPadding]="ignorePagePadding"
	[slides]="slides"
	(selectedSlide)="getDataFromActiveSlide($event)"
>
	<kirby-card *kirbyCarouselSlide="let slide; let i = index" [hasPadding]="true">
			<kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>

			<div class="card-content">
					{{ slide.cardContent }}
			</div>
	</kirby-card>
</kirby-carousel>
`;

export const customConfigExample = `customConfig: SlidesOptions = {
	slidesPerView: 1.2,
	centeredSlides: true,
	slidesPerGroup: 1,
	breakpoints: {
		992: {
		centeredSlides: false,
		slidesPerView: 3.2,
		slidesPerGroup: 3,
		},
	},
};`;
