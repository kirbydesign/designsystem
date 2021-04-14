import { Component } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem';

import { ShowcaseProperty } from '../../shared/showcase-properties/showcase-property';
@Component({
  styleUrls: ['./toggle-button-showcase.component.scss'],
  templateUrl: './toggle-button-showcase.component.html',
})
export class ToggleButtonShowcaseComponent {
  notificationColors = ColorHelper.notificationColors.map((color) => color.name);
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
  buttonProperties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: `Sets the background color to the provided notification color.
        **Please note: Only applies when used inside a Toggle Button`,
      defaultValue: '',
      inputValues: this.notificationColors,
    },
  ];
}
