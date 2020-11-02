import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-slides-example',
  templateUrl: './slides-example.component.html',
})
export class SlidesExampleComponent {
  constructor() {}

  slidesOptions = {
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 1.15,
    breakpoints: {
      721: {
        slidesPerView: 2.15,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3.3,
        centeredSlides: false,
      },
    },
  };

  slides = [1, 2, 3, 4, 5];

  hasPadding = true;
  showSize = true;
  hasHeader = true;
  title = 'Test Title';
  subtitle = 'Test Subtitle';
  hasHeaderFooterBgColor = true;
  hasFooter = true;
}
