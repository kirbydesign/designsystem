import { Component } from '@angular/core';

import { ColorHelper, KirbyColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  brandColors = ColorHelper.brandColors;
  notificationColors = ColorHelper.notificationColors;
  decorationColors = ColorHelper.decorationColors;
  systemColors = ColorHelper.systemColors;
  textColors = ColorHelper.textColors;

  onColorClick(color: KirbyColor) {
    this.selectedColor = color.name;
    this.selectedOnColor = color.name + '-contrast';
  }
}
