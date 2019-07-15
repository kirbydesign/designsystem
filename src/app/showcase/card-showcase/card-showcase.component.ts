import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
})
export class CardShowcaseComponent {
  exampleHtml: string = require('../../examples/card-example/card-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'Sets the larger title in kirby-card-header',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'subtitle',
      description: 'Smaller title in kirby-card-header',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'mode',
      description:
        '(Optional) Sets a custom elevation on the card. Default elevation = 2, flat = 0, highlighted = 4.',
      defaultValue: '',
      inputValues: ['flat', 'highlighted'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the card should use from the theme palette.',
      defaultValue: 'null',
      inputValues: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'light',
        'medium',
        'dark',
      ],
    },
  ];
}
