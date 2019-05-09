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
      name: 'openIconName',
      description: 'The name of the icon that will appear when fab-sheet is closed.',
      defaultValue: 'cog',
      inputValues: ['string'],
    },
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'alignment',
      description: 'Determines whether the fab-sheet will be displayed under or below fab button.',
      defaultValue: 'top',
      inputValues: ['top', 'bottom'],
    },
    {
      name: 'header',
      description: 'Style sheet header text.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'subheader',
      description: 'Style sheet subheader text.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'actions',
      description: 'Fab-sheet actions. Array of action items.',
      defaultValue: 'null',
      inputValues: ['string[]'],
    },
  ];
}
