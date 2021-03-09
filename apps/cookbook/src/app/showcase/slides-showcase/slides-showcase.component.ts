import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-slide-showcase',
  templateUrl: './slides-showcase.component.html',
  preserveWhitespaces: true,
})
export class SlidesShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/slides-example/slides-example.component.html')
    .default;

  exampleTS: string = require('!raw-loader!../../examples/slides-example/slides-example.component.ts')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'slidesOptions',
      description:
        'Configuration object for ion-slides. View documentation at: [https://ionicframework.com/docs/v3/api/components/slides/Slides/#input-properties] for available props',
      defaultValue: '',
      inputValues: ['object'],
    },
    {
      name: 'slides',
      description: 'Object array holding the data to be shown',
      defaultValue: '',
      inputValues: ['DataArray'],
    },
  ];
  events: ShowcaseEvent[] = [
    {
      name: 'selectedSlide',
      description: 'Emits active slide',
      signature: 'func',
    },
  ];
}
