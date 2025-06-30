import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { FormFieldInputLabelExampleComponent } from '~/app/examples/form-field-example/examples/input/label';
import { LabelExampleDirectionComponent } from '~/app/examples/label-example/examples/direction';

@Component({
  selector: 'cookbook-label-showcase',
  templateUrl: './label-showcase.component.html',
  styleUrls: ['./label-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ApiDescriptionPropertiesComponent,
    FormFieldInputLabelExampleComponent,
    LabelExampleDirectionComponent,
  ],
})
export class LabelShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'direction',
      description: 'Sets the direction of the label to be either "vertical" or "horizontal".',
      defaultValue: "'vertical'",
      type: ["'vertical' | 'horizontal' "],
    },
  ];
}
