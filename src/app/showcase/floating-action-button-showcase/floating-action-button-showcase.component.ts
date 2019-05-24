import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-floating-action-button-showcase',
  templateUrl: './floating-action-button-showcase.component.html',
})
export class FloatingActionButtonShowcaseComponent {
  exampleHtml: string = require('../../examples/floating-action-button-example/floating-action-button-example.component.html');

  properties: ShowcaseProperty[] = [
    {
      name: 'showShadow',
      description: 'Determines whether the button will have a shadow or not.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'isFloating',
      description: 'Determines whether the button will be floating or not.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
  ];
}
