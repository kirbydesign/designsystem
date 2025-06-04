import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { LabelExampleItemComponent } from '../../examples/label-example/examples/item';
import { LabelFormFieldInputLabelExampleComponent } from '../../examples/label-example/examples/label';
import { FormFieldTextareaLabelExampleComponent } from '../../examples/label-example/examples/textarea/label';
import { RadioInFormFieldExampleComponent } from '../../examples/radio-example/examples/in-form-field';

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
    FormFieldTextareaLabelExampleComponent,
    RadioInFormFieldExampleComponent,
  ],
})
export class LabelShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'text',
      description: 'The text content of the label.',
      defaultValue: "''",
      type: ['string'],
    },
    {
      name: 'for',
      description: 'ID of the element the label is associated with.',
      defaultValue: 'null',
      type: ['string | null'],
    },
    {
      name: 'required',
      description: 'Marks the label as required (adds a visual indicator).',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'direction',
      description:
        'Sets the direction of the label content (e.g., left-to-right or right-to-left).',
      defaultValue: "'ltr'",
      type: ["'ltr' | 'rtl'"],
    },
  ];

  customCssPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  customCssProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-label-color',
      description: 'Text color of the label.',
    },
    {
      name: '--kirby-label-font-size',
      description: 'Font size of the label.',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
