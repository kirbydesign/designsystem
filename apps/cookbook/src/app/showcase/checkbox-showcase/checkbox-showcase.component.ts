import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { CheckboxConfirmExampleComponent } from '../../examples/checkbox-example/examples/confirm';
import { CheckboxDefaultExampleComponent } from '../../examples/checkbox-example/examples/default';
import { CheckboxListExampleComponent } from '../../examples/checkbox-example/examples/list';
import { CheckboxStatesExampleComponent } from '../../examples/checkbox-example/examples/states';
import { CheckboxSizesExampleComponent } from '../../examples/checkbox-example/examples/sizes';
import { CheckboxMultilineExampleComponent } from '../../examples/checkbox-example/examples/multiline';
import { CheckboxEventsExampleComponent } from '../../examples/checkbox-example/examples/events';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { CheckboxReactiveFormsExampleComponent } from '../../examples/checkbox-example/examples/reactive-forms';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { CheckboxIndeterminateListExampleComponent } from '../../examples/checkbox-example/examples/list-indeterminate';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';

@Component({
  selector: 'cookbook-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
  styleUrls: ['./checkbox-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    CheckboxConfirmExampleComponent,
    CheckboxDefaultExampleComponent,
    RouterLink,
    CheckboxListExampleComponent,
    CheckboxIndeterminateListExampleComponent,
    CheckboxStatesExampleComponent,
    CheckboxSizesExampleComponent,
    CheckboxMultilineExampleComponent,
    CheckboxEventsExampleComponent,
    CodeViewerComponent,
    CheckboxReactiveFormsExampleComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
  ],
})
export class CheckboxShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'attentionLevel',
      description: `Specifies a look.
Use attentionLevel 1 for confirm scenarios.
Use the default attentionLevel 2 for checkbox lists.`,
      defaultValue: '2',
      type: ['1', '2'],
    },
    {
      name: 'checked',
      description: 'If `true`, the checkbox is selected',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'indeterminate',
      description:
        'If `true`, the selection state is indeterminate and will take precedence over `checked` visually.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Disables the checkbox',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'hasError',
      description: 'Indicates whether the checkbox is in an error state',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'size',
      description: 'Sets the size of the clickable/tapable area',
      defaultValue: 'md',
      type: ['xs', 'sm', 'md'],
    },
    {
      name: 'text',
      description: 'Adds a label text',
      type: ['string'],
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'checkedChange',
      description: 'Emitted when the checkbox checked has changed',
      signature: 'Promise<Boolean>',
    },
  ];
}
