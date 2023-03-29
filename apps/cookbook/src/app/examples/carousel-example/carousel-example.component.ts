import { Component } from '@angular/core';
import { CarouselConfig } from '@kirbydesign/designsystem/carousel';

@Component({
  selector: 'cookbook-carousel-example',
  templateUrl: './carousel-example.component.html',
  styleUrls: ['./carousel-example.component.scss'],
})
export class CarouselExampleComponent {
  maxWidth: string = 'full';

  maxWidthOptions = [
    {
      text: 'default',
      value: 'default',
    },
    {
      text: 'standard',
      value: 'standard',
    },
    {
      text: 'optimized',
      value: 'optimized',
    },
    {
      text: 'full',
      value: 'full',
    },
  ];

  ignorePagePadding: boolean = false;

  onCheckedChange($event) {
    this.ignorePagePadding = $event;
  }

  configExample1: CarouselConfig = {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: false,
    spaceBetween: 8,
    pagination: true,
    navigation: true,
    slidesPerGroup: 1,
    // pagination: {
    //   el: '.example1-pagination',
    //   type: 'bullets',
    //   enabled: false,
    // },
    // navigation: {
    //   nextEl: '.example1-next',
    //   prevEl: '.example1-prev',
    //   enabled: true,
    // },
    breakpoints: {
      1025: {
        centeredSlides: false,
        slidesPerView: 3.2,
        spaceBetween: 16,
        slidesPerGroup: 3,
        // pagination: {
        //   enabled: true,
        // },
      },
    },
  };

  configExample2: CarouselConfig = {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 8,
    slidesPerGroup: 3,
    slidesPerGroupSkip: 3,
    pagination: {
      el: '.example2-pagination',
      type: 'bullets',
      enabled: false,
    },
    navigation: {
      nextEl: '.example2-next',
      prevEl: '.example2-prev',
      enabled: true,
    },
    breakpoints: {
      1025: {
        centeredSlides: false,
        slidesPerView: 3,

        pagination: {
          enabled: true,
        },
      },
    },
  };

  configExample3: CarouselConfig = {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: false,
    spaceBetween: 8,
    pagination: {
      el: '.example3-pagination',
      type: 'bullets',
      enabled: false,
    },
    navigation: {
      nextEl: '.example3-next',
      prevEl: '.example3-prev',
      enabled: true,
    },
    breakpoints: {
      1025: {
        slidesPerView: 3.2,
        spaceBetween: 16,
        pagination: {
          enabled: true,
        },
      },
    },
  };
}
