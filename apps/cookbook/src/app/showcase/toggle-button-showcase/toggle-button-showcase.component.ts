import { Component } from '@angular/core';

import { ShowcaseProperty } from '../../shared/showcase-properties/showcase-property';
@Component({
  templateUrl: './toggle-button-showcase.component.html',
})
export class ToggleButtonShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle button is selected.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'checkedChange',
      description: 'Emits the checked state of the toggle button on change (true | false).',
      defaultValue: '',
      inputValues: ['event'],
    },
  ];
}
