import { Component } from '@angular/core';
import {
  carouselDefaultConfig,
  customConfigExample,
  exampleComponentHTML,
} from '../../examples/carousel-example/carousel-code-snippets';
import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethod } from '../../shared/api-description/api-description-methods/api-description-methods.component';
@Component({
  selector: 'cookbook-carousel-showcase',
  templateUrl: './carousel-showcase.component.html',
})
export class CarouselShowcaseComponent {
  carouselDefaultConfig: string = carouselDefaultConfig;
  exampleComponentHTML: string = exampleComponentHTML;
  customConfigExample: string = customConfigExample;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'slidesOptions',
      description: `Configuration object for swiper-container. View documentation at: [https://swiperjs.com/swiper-api#parameters] for available parameters`,
      defaultValue: 'null',
      type: ['KirbySwiperOptions'],
    },
    {
      name: 'slides',
      description: `Array of items to be displayed in the carousel.`,
      defaultValue: 'null',
      type: ['any[]'],
    },
    {
      name: 'title',
      description: `A title that will be displayed above the carousel in the top left corner.`,
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'ignorePagePadding',
      description: `Makes the carousel ignore the kirby-page padding and expand to the edge of the page.`,
      defaultValue: 'null',
      type: ['boolean'],
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'selectedSlide',
      description: 'Emits the active slide´s data and index',
      signature: '{slide: any, index: number}',
    },
  ];

  methods: ApiDescriptionMethod[] = [
    {
      name: 'slideTo',
      description: 'Slides to the specified slide index.',
      signature: '(index: number) => void',
    },
  ];
}
