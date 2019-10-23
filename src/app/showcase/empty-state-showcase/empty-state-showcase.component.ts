import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-empty-state-showcase',
  templateUrl: './empty-state-showcase.component.html',
  styleUrls: ['./empty-state-showcase.component.scss'],
})
export class EmptyStateShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/empty-state-example/empty-state-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'iconName',
      description: 'Name of the icon (see icons).',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'title',
      description: 'The title.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'subtitle',
      description: 'The text beneath the title.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the empty state should use from the theme palette.',
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
