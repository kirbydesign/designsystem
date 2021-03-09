import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

@Component({
  selector: 'cookbook-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
  styleUrls: ['./checkbox-showcase.component.scss'],
})
export class CheckboxShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'attentionLevel',
      description: `Specifies a look.
Use attentionLevel 1 for confirm scenarios.
Use the default attentionLevel 2 for checkbox lists.`,
      defaultValue: '2',
      inputValues: ['1', '2'],
    },
    {
      name: 'checked',
      description: 'If `true`, the checkbox is selected',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Disables the checkbox',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'hasError',
      description: 'Indicates whether the checkbox is in an error state',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'size',
      description: 'Sets the size of the clickable/tapable area',
      defaultValue: 'md',
      inputValues: ['xs', 'sm', 'md'],
    },
    {
      name: 'text',
      description: 'Adds a label text',
      inputValues: ['string'],
    },
  ];

  events: ShowcaseEvent[] = [
    {
      name: 'checkedChange',
      description: 'Emitted when the checkbox checked has changed',
      signature: 'Promise<Boolean>',
    },
  ];
}
