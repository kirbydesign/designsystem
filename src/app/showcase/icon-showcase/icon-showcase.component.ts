import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
import { icons } from '~/kirby/components/icon/icon.component';

declare var require: any;

@Component({
  selector: 'kirby-icon-showcase',
  templateUrl: './icon-showcase.component.html',
})
export class IconShowcaseComponent {
  exampleHtml: string = require('../../examples/icon-example/icon-example.component.html');

  properties: ShowcaseProperty[] = [
    {
      name: 'name',
      description: 'Name of the icon that you want to show.',
      defaultValue: 'cog',
      inputValues: icons.map((icon) => icon.name),
    },
    {
      name: 'size',
      description: 'Determines size of the icon.',
      defaultValue: 'small',
      inputValues: ['small', 'large'],
    },
    {
      name: 'colorType',
      description: 'Sets which color the icon should use from the theme palette.',
      defaultValue: 'primary',
      inputValues: ['primary', 'secondary', 'tertiary'],
    },
  ];
}
