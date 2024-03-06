import { Component } from '@angular/core';
import {
  advancedExampleComponentHTML,
  customConfigExample,
  defaultExampleComponentHTML,
  heightExampleComponentHTML,
  slidesDefaultConfig,
} from '../../examples/slides-example/slides-code-snippets';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethod } from '../../shared/api-description/api-description-methods/api-description-methods.component';
@Component({
  selector: 'cookbook-slides-showcase',
  templateUrl: './slides-showcase.component.html',
  styleUrls: ['../_showcase.shared.scss'],
})
export class SlidesShowcaseComponent {
  slidesDefaultConfig: string = slidesDefaultConfig;
  defaultExampleComponentHTML: string = defaultExampleComponentHTML;
  heightExampleComponentHTML: string = heightExampleComponentHTML;
  advancedExampleComponentHTML: string = advancedExampleComponentHTML;
  customConfigExample: string = customConfigExample;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'slidesOptions',
      description: `Configuration object for Swiper.\n\nView documentation at: https://swiperjs.com/swiper-api#parameters for available parameters`,
      defaultValue: 'null',
      type: ['KirbySwiperOptions'],
    },
    {
      name: 'slides',
      description: `Array of items to be displayed as slides.`,
      defaultValue: 'null',
      type: ['unknown[]'],
    },
    {
      name: 'title',
      description: `Text that describes the slides content (mandatory). Will be displayed above the slides in the top left corner.`,
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'showNavigation',
      description: 'Whether to show navigation and pagination controls for the slider.',
      defaultValue: 'true',
      type: ['boolean'],
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'slideChange',
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

  directiveColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    type: '(Optional) Configuration',
    default: 'Default',
  };

  directives: ApiDescriptionProperty[] = [
    {
      name: '*kirbySlide',
      description:
        'The `*kirbySlide` directive should be applied to a `kirby-card` which will then be used as the template for each slide.',
    },
    {
      name: 'slideStretchHeight',
      description:
        'If individual slides have variable height you can add this attribute directive in order to make slides equal height.',
    },
  ];
}
