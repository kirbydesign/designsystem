import { Component } from '@angular/core';
import exampleHtml from '../../examples/slide-button-example/slide-button-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-slide-button-showcase',
  templateUrl: './slide-button-showcase.component.html',
})
export class SlideButtonShowcaseComponent {
  exampleHtml = exampleHtml;
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
