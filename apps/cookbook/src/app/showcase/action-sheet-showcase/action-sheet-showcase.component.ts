import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-action-sheet-showcase',
  templateUrl: './action-sheet-showcase.component.html',
  preserveWhitespaces: true,
})
export class ActionSheetShowcaseComponent {
  exampleHtml: string =
    require('!raw-loader!../../examples/action-sheet-example/action-sheet-example.component.html')
      .default;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'header',
      description: '(Optional) The header of the action sheet',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'subheader',
      description: '(Optional) The subheader of the action sheet',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'items',
      description: 'The options shown inside the action sheet',
      defaultValue: '',
      type: ['Array<ActionSheetItem>'],
    },
    {
      name: 'cancelButtonText',
      description: '(Optional) The text for the cancel button.',
      defaultValue: 'Cancel',
      type: ['string'],
    },
  ];
}
