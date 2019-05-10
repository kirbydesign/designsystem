import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-fab-sheet-showcase',
  templateUrl: './fab-sheet-showcase.component.html',
})
export class FabSheetShowcaseComponent {
  exampleHtml: string = require('../../examples/fab-sheet-example/fab-sheet-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'horizontalAlignment',
      description: 'Determines horizontal position of fab sheet.',
      defaultValue: 'right',
      inputValues: ['left', 'center', 'right'],
    },
    {
      name: 'ActionSheetConfig',
      description: 'See documentation for action sheet.',
      defaultValue: '',
      inputValues: ['ActionSheetConfig'],
    },
  ];
}
