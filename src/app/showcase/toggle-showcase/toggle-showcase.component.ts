import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
})
export class ToggleShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/toggle-example/toggle-example.component.html')
    .default;
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
      name: 'checkedChange',
      description: 'Emits the checked state of the toggle on change (true | false).',
      defaultValue: '',
      inputValues: ['event'],
    },
  ];
}
