import { Component } from '@angular/core';
import exampleHtml from '../../examples/card-example/card-example.component.html?raw';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
})
export class CardShowcaseComponent {
  exampleHtml = exampleHtml;
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
      name: 'backgroundImageUrl',
      description: '(Optional) Provided a valid URL will set the background image of the card.',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'flat',
      description: '(Optional) Remove elevation on the card. Default elevation = 2, flat = 0.',
      defaultValue: '',
      type: ['boolean'],
    },
    {
      name: 'hasPadding',
      description: '',
      defaultValue: 'false',
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

  propertiesHeaderAndFooter: ApiDescriptionProperty[] = [
    {
      name: 'hasPadding',
      description: 'Sets the inner padding for card header and card footer',
      defaultValue: 'true',
      type: ['boolean'],
    },
  ];

  customCssPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Attribute',
    description: 'Description',
    default: 'Default',
  };

  customCssProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-card-background-image',
      description: "Sets the 'background-image' property of the card.",
    },
    {
      name: '--kirby-card-background-repeat',
      description: "Sets the 'background-repeat' property of the card",
      defaultValue: 'no-repeat',
    },
    {
      name: '--kirby-card-background-position',
      description: "Sets the 'background-position' property of the card",
      defaultValue: 'center',
    },
    {
      name: '--kirby-card-background-size',
      description: "Sets the 'background-size' property of the card",
      defaultValue: 'cover',
    },
    {
      name: '--kirby-card-padding-top',
      description: "Sets the 'padding-top' property of the card",
      defaultValue: "size('s')",
    },
    {
      name: '--kirby-card-padding-bottom',
      description: "Sets the 'padding-bottom' property of the card",
      defaultValue: "size('s')",
    },
  ];
}
