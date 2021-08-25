import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-slide-button-showcase',
  templateUrl: './slide-button-showcase.component.html',
  styleUrls: ['./slide-button-showcase.component.scss'],
})
export class SlideButtonShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/slide-button-example/slide-button-example.component.html')
    .default;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      type: ['block'],
    },
    {
      name: 'text',
      description: 'The text to show in the slide button',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'slideDone',
      description: 'Event triggered on slide done',
      defaultValue: null,
      type: ['event'],
    },
    {
      name: 'slidePercentageChanged',
      description: 'Event triggered when the slide percentage changes containing the percentage',
      defaultValue: null,
      type: ['number'],
    },
  ];
}
