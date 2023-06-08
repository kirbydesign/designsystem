import { Component } from '@angular/core';
import {
  advancedExampleComponentHTML,
  customConfigExample,
  defaultExampleComponentHTML,
  slidesDefaultConfig,
} from '../../examples/slides-example/slides-code-snippets';
import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethod } from '../../shared/api-description/api-description-methods/api-description-methods.component';
@Component({
  selector: 'cookbook-carousel-showcase',
  templateUrl: './slides-showcase.component.html',
  styleUrls: ['../_showcase.shared.scss'],
})
export class SlidesShowcaseComponent {
  slidesDefaultConfig: string = slidesDefaultConfig;
  defaultExampleComponentHTML: string = defaultExampleComponentHTML;
  advancedExampleComponentHTML: string = advancedExampleComponentHTML;
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
      description: `Array of items to be displayed as slides.`,
      defaultValue: 'null',
      type: ['any[]'],
    },
    {
      name: 'title',
      description: `An optional title that will be displayed above the slides in the top left corner.`,
      defaultValue: 'null',
      type: ['string'],
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
