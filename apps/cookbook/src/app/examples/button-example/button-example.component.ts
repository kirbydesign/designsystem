import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  @Input() themeColor: ThemeColor | '' = '';
  buttonSize = 'md';
  buttonSizes = [
    {
      text: 'Extra Small',
      value: 'xs',
    },
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
