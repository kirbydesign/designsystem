import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'kirby-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer;

  @Input() pagination: boolean;
  @Input() navigation: boolean;

  ngAfterViewInit() {
    const swiperParams: SwiperOptions = {
      pagination: {
        el: '.pagination',
        type: 'bullets',
      },
      navigation: {
        nextEl: '.nav-next',
        prevEl: '.nav-prev',
      },
      slidesPerView: 1.1,
      centeredSlides: true,
      spaceBetween: 8,
    };

    Object.assign(this.swiperContainer.nativeElement, swiperParams);

    this.swiperContainer.nativeElement.initialize();
  }
}
