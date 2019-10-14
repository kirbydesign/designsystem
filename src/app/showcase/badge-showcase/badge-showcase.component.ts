import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;
@Component({
  selector: 'kirby-badge-showcase',
  templateUrl: './badge-showcase.component.html',
  styleUrls: ['./badge-showcase.component.scss'],
})
export class BadgeShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/badge-example/badge-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the badge should use from the theme palette.',
      defaultValue: 'white',
      inputValues: ['white', 'success', 'warning', 'danger'],
    },
  ];
}
