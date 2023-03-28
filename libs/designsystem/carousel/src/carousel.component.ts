import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';

register();

export type CarouselConfig = SwiperOptions;
@Component({
  selector: 'kirby-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer;

  @Input() config: CarouselConfig;
  @Input() prevButtonClass: string;
  @Input() nextButtonClass: string;
  @Input() paginationClass: string;
  @Input() noPadding: boolean;

  ngAfterViewInit() {
    const defaultConfig: SwiperOptions = {
      // pagination: {
      //   el: '.pagination',
      //   type: 'bullets',
      // },
      // navigation: {
      //   nextEl: '.nav-next',
      //   prevEl: '.nav-prev',
      // },
      // slidesPerView: 1.1,
      // centeredSlides: true,
      // spaceBetween: 8,
    };

    const config = Object.assign(defaultConfig, this.config);

    Object.assign(this.swiperContainer.nativeElement, config);

    this.swiperContainer.nativeElement.initialize();
  }
}
