import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { LabelExampleItemComponent } from '../../examples/label-example/examples/item';
import { LabelFormFieldInputLabelExampleComponent } from '../../examples/label-example/examples/label';

import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-label-showcase',
  templateUrl: './label-showcase.component.html',
  styleUrls: ['./label-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    LabelExampleItemComponent,
    LabelFormFieldInputLabelExampleComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class LabelShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'direction',
      description: 'Sets the direction of the label to be either "vertical" or "horizontal".',
      defaultValue: "'horizontal'",
      type: ["'vertical' | 'horizontal' "],
    },
  ];

  customCssPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Attribute',
    description: 'Description',
    default: 'Default',
  };
}
