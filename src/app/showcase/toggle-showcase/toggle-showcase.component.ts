import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
})
export class ToggleShowcaseComponent {
  exampleHtml: string = require('../../examples/toggle-example/toggle-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle is selected.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'disabled',
      description: 'If true, the toggle is disabled.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the toggle should use from the theme palette.',
      defaultValue: 'primary',
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
