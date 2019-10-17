import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-fab-sheet-showcase',
  templateUrl: './fab-sheet-showcase.component.html',
  styleUrls: ['./fab-sheet-showcase.component.scss'],
})
export class FabSheetShowcaseComponent {
  disableFabSheet = false;

  exampleHtml: string = require('!raw-loader!../../examples/fab-sheet-example/fab-sheet-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'disabled',
      description: '(Optional) Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'horizontalAlignment',
      description: '(Optional) Determines horizontal position of fab sheet.',
      defaultValue: 'right',
      inputValues: ['left', 'center', 'right'],
    },
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
  ];
}
