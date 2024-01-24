import { Component } from '@angular/core';
import exampleHtml from '../../examples/badge-example/badge-example.component.html?raw';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-badge-showcase',
  templateUrl: './badge-showcase.component.html',
})
export class BadgeShowcaseComponent {
  exampleHtml = exampleHtml;
  _cardHasPadding = true;

  _properties: ApiDescriptionProperty[] = [
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

  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    default: 'default',
  };

  _cssCustomProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-badge-position',
      description: 'Sets the position property of the badge.',
      defaultValue: 'relative',
    },
    {
      name: '--kirby-badge-top',
      description: 'Sets the vertical position of the badge.',
      defaultValue: 'auto',
    },
    {
      name: '--kirby-badge-right',
      description: 'Sets the horizontal position of the badge.',
      defaultValue: 'auto',
    },
    {
      name: '--kirby-badge-left',
      description: 'Sets the horizontal position of the badge.',
      defaultValue: 'auto',
    },
    {
      name: '--kirby-badge-elevation',
      description: 'Sets the box-shadow property of the badge.',
      defaultValue: 'none | [custom elevation on white badge]',
    },
    {
      name: '--kirby-badge-color',
      description:
        'Sets the text color of the badge. It is recommended to use the themeColor input property instead to not break the color scheme.',
    },
    {
      name: '--kirby-badge-background-color',
      description:
        'Sets the background color of the badge. It is recommended to use the themeColor input property instead to not break the color scheme.',
    },
    {
      name: '--kirby-badge-z-index',
      description: 'Sets the z-index property of the badge.',
    },
  ];
}
