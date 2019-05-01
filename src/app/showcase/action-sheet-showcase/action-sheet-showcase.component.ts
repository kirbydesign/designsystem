import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-action-sheet-showcase',
  templateUrl: './action-sheet-showcase.component.html',
})
export class ActionSheetShowcaseComponent {
  exampleHtml: string = require('../../examples/action-sheet-example/action-sheet-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The header of the action sheet',
      defaultValue: '',
      inputValues: ['string'],
    },
  ];
}
