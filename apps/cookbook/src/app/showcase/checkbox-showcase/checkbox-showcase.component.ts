import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
  styleUrls: ['./checkbox-showcase.component.scss'],
})
export class CheckboxShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'attentionLevel',
      description:
        'Specifies a look.\nUse attentionLevel 1 for confirm scenarios\nUse attentionLevel 2 for others',
      defaultValue: '2',
      inputValues: ['1', '2'],
    },
    {
      name: 'checked',
      description: 'Checks and unchecks the checkbox',
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
      description: 'Shows an error border color, if not checked',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
  ];

  events: ShowcaseProperty[] = [
    {
      name: 'checkedChange',
      description: 'Emitted when the checkbox checked has changed',
    },
  ];
}
