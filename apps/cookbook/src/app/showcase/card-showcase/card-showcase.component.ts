import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
})
export class CardShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/card-example/card-example.component.html')
    .default;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: 'Sets the larger title in kirby-card-header',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'subtitle',
      description: 'Smaller title in kirby-card-header',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'mode',
      description:
        '(Optional) Sets a custom elevation on the card. Default elevation = 2, flat = 0, highlighted = 4.',
      defaultValue: '',
      type: ['flat', 'highlighted'],
    },
    {
      name: 'hasPadding',
      description: '',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the card should use from the theme palette.',
      defaultValue: 'null',
      type: [
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
