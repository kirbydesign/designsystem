import { Component } from '@angular/core';
import exampleHtml from '../../examples/action-sheet-example/action-sheet-example.component.html?raw';
import { ActionSheetExampleComponent } from '../../examples/action-sheet-example/action-sheet-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-action-sheet-showcase',
  templateUrl: './action-sheet-showcase.component.html',
  preserveWhitespaces: true,
  imports: [ActionSheetExampleComponent, CodeViewerComponent, ApiDescriptionPropertiesComponent],
})
export class ActionSheetShowcaseComponent {
  exampleHtml = exampleHtml;
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
