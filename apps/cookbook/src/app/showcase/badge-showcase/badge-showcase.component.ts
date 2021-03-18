import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;
@Component({
  selector: 'cookbook-badge-showcase',
  templateUrl: './badge-showcase.component.html',
  styleUrls: ['./badge-showcase.component.scss'],
})
export class BadgeShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/badge-example/badge-example.component.html')
    .default;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the badge should use from the theme palette.',
      defaultValue: 'white',
      type: ['white', 'success', 'warning', 'danger'],
    },
  ];
}
