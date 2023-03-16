import { Component } from '@angular/core';
import { CarouselConfig } from '@kirbydesign/designsystem/carousel';
@Component({
  selector: 'cookbook-carousel-showcase',
  templateUrl: './carousel-showcase.component.html',
})
export class CarouselShowcaseComponent {
  config: CarouselConfig = {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 8,
    pagination: false,
    navigation: false,
    breakpoints: {
      // when window width is >= 320px
      321: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      721: {
        slidesPerView: 3,
        centeredSlides: false,
        pagination: {
          el: '.pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: '.nav-next',
          prevEl: '.nav-prev',
        },
      },
      // when window width is >= 640px
      1025: {
        slidesPerView: 4,
      },
    },
  };
}
