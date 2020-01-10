import { Component, Input } from '@angular/core';

import { ThemeColor } from './../../../kirby/helpers/theme-color.type';
import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  @Input() themeColor: ThemeColor | '' = '';
  buttonSize = 'md';
  buttonSizes = [
    {
      text: 'Small',
      value: 'sm',
    },
    {
      text: 'Medium (default)',
      value: 'md',
    },
    {
      text: 'Large',
      value: 'lg',
    },
  ];

  onButtonSizeChange(value) {
    this.buttonSize = value;
  }
}
