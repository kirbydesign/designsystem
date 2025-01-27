import { Component } from '@angular/core';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import exampleHtml from '../../examples/fab-sheet-example/fab-sheet-example.component.html?raw';
import { FabSheetExampleComponent } from '../../examples/fab-sheet-example/fab-sheet-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-fab-sheet-showcase',
  templateUrl: './fab-sheet-showcase.component.html',
  styleUrls: ['./fab-sheet-showcase.component.scss'],
  imports: [
    CheckboxComponent,
    FabSheetExampleComponent,
    CodeViewerComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class FabSheetShowcaseComponent {
  disableFabSheet = false;

  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'disabled',
      description: '(Optional) Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'horizontalAlignment',
      description: '(Optional) Determines horizontal position of fab sheet.',
      defaultValue: 'right',
      type: ['left', 'center', 'right'],
    },
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
  ];
}
