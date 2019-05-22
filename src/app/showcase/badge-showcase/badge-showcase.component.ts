import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;
@Component({
  selector: 'kirby-badge-showcase',
  templateUrl: './badge-showcase.component.html',
  styleUrls: ['./badge-showcase.component.scss'],
})
export class BadgeShowcaseComponent {
  exampleHtml: string = require('../../examples/badge-example/badge-example.component.html');

  properties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the badge should use from the theme palette.',
      defaultValue: '',
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
