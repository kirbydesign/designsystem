import { Component } from '@angular/core';
declare var require: any;

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent {
  themeColors = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark',
  ];
  themeColor = '';
  exampleHtml: string = require('../../examples/button-example/button-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      inputValues: ['block'],
    },
    {
      name: 'size',
      description: 'Sets the size of the button.',
      defaultValue: 'md',
      inputValues: ['sm', 'md', 'lg'],
    },
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button. Button color will be updated automatically depending on host color.',
      defaultValue: '1',
      inputValues: ['1', '2', '3', '4'],
    },
    {
      name: 'isDestructive',
      description:
        'If isDestructive is set, color of the button will be changed according to attention level.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
  ];

  onChange(value) {
    this.themeColor = value;
  }
}
