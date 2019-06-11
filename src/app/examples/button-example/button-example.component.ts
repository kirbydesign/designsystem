import { Component, Input } from '@angular/core';

import { ThemeColor } from './../../../kirby/helpers/theme-color.type';

@Component({
  selector: 'kirby-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  @Input() themeColor: ThemeColor = 'primary';
}
