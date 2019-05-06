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
      description: 'The name of the icon that will appear on fab-sheet when its closed.',
      defaultValue: 'cog',
      inputValues: ['string'],
    },
    {
      name: 'closeIconName',
      description: 'The name of the icon that will appear when fab-sheet is open.',
      defaultValue: 'cog',
      inputValues: ['string'],
    },
    {
      name: 'showShadow',
      description:
        'Determines whether the button will have a shadow or not. Default value is true.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not. Default value is false.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
  ];
}
