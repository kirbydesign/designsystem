import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { LabelExampleItemComponent } from '../../examples/label-example/examples/item';
import { LabelFormFieldInputLabelExampleComponent } from '../../examples/label-example/examples/label';

import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-label-showcase',
  templateUrl: './label-showcase.component.html',
  styleUrls: ['./label-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    LabelExampleItemComponent,
    LabelFormFieldInputLabelExampleComponent,
  ],
})
export class LabelShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'direction',
      description:
        'Sets the direction of the label content (e.g., left-to-right or right-to-left).',
      defaultValue: "'ltr'",
      type: ["'ltr' | 'rtl'"],
    },
  ];
}
