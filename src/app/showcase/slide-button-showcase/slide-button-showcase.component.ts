import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-slide-button-showcase',
  templateUrl: './slide-button-showcase.component.html',
  styleUrls: ['./slide-button-showcase.component.scss'],
})
export class SlideButtonShowcaseComponent {
  exampleHtml: string = require('../../examples/slide-button-example/slide-button-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      inputValues: ['block'],
    },
    {
      name: 'text',
      description: 'The text to show in the slide button',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'slideDone',
      description: 'Event triggered on slide done',
      defaultValue: null,
      inputValues: ['event'],
    },
    {
      name: 'slidePercentageChanged',
      description: 'Event triggered when the slide percentage changes containing the percentage',
      defaultValue: null,
      inputValues: ['number'],
    },
  ];
}
