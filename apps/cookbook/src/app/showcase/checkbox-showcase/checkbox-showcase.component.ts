import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
  styleUrls: ['./checkbox-showcase.component.scss'],
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
