import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-action-sheet-showcase',
  templateUrl: './action-sheet-showcase.component.html',
  preserveWhitespaces: true,
})
export class ActionSheetShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/action-sheet-example/action-sheet-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'header',
      description: '(Optional) The header of the action sheet',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'subheader',
      description: '(Optional) The subheader of the action sheet',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'items',
      description: 'The options shown inside the action sheet',
      defaultValue: '',
      inputValues: ['Array<ActionSheetItem>'],
    },
    {
      name: 'cancelButtonText',
      description: '(Optional) The text for the cancel button.',
      defaultValue: 'Cancel',
      inputValues: ['string'],
    },
  ];
}
