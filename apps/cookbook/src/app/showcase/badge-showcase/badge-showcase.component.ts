import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-badge-showcase',
  templateUrl: './badge-showcase.component.html',
  styleUrls: ['./badge-showcase.component.scss'],
})
export class BadgeShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/badge-example/badge-example.component.html')
    .default;
  _cardMode = 'flat';
  _cardHasPadding = true;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the badge should use from the theme palette.',
      defaultValue: 'white',
      type: ['white', 'success', 'warning', 'danger'],
    },
    {
      name: 'size',
      description: 'Sets the size of the badge',
      defaultValue: 'md',
      type: ['sm', 'md'],
    },
  ];
}
