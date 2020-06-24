import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;
@Component({
  selector: 'cookbook-flag-showcase',
  templateUrl: './flag-showcase.component.html',
})
export class FlagShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/flag-example/flag-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the flag should use.',
      defaultValue: 'transparent',
      inputValues: ['success', 'warning', 'danger', 'semi-light', 'transparent'],
    },
    {
      name: 'size',
      description: 'Sets the size of the flag.',
      defaultValue: 'md',
      inputValues: ['xs', 'sm', 'md'],
    },
  ];
}
