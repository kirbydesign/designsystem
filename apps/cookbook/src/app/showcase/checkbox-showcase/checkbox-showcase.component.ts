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
      name: 'error',
      description: 'Shows an error border color, if not checked',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'type',
      description:
        'Specifies a look.\nUse "single" as a binary choice for a standalone checkbox.\nUse "multi" in a list of checkboxes, where multiple choices can be selected',
      defaultValue: 'single',
      inputValues: ['single', 'multi'],
    },
  ];

  events: ShowcaseProperty[] = [
    {
      name: 'checkedChange',
      description: 'Emitted when the checkbox checked has changed',
    },
  ];
}
