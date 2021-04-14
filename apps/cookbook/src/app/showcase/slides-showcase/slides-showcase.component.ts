import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

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
      description: 'Objectarray holding the data to be shown',
      defaultValue: '',
      inputValues: ['DataArray'],
    },
  ];
  events: ShowcaseProperty[] = [
    {
      name: 'selectedSlide',
      description: 'Emits active slide',
      inputValues: ['func'],
    },
  ];
}
