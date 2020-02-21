import { Component } from '@angular/core';

import { SassColor } from '@kirbydesign/designsystem';

// @ts-ignore
import { data as style } from './colors-showcase.component.styling';

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  brandColors = [];
  systemColors = [];
  notificationColors = [];

  constructor() {
    this.brandColors = this.getColors('$brand_colors');
    this.systemColors = this.getColors('$system_colors');
    this.notificationColors = this.getColors('$notification_colors');
  }

  onColorClick(sassColor: SassColor) {
    this.selectedColor = sassColor.name;
    this.selectedOnColor = sassColor.name + '-contrast';
  }

  private getColors(colorType: string) {
    const mainColors = style[colorType];
    const generatedColors = style.$kirby_colors;
    return Object.entries(mainColors).map(([name, value]) => ({
      name,
      value,
      tint: {
        name: name + '-tint',
        hex: generatedColors[name + '_tint'],
      },
      shade: {
        name: name + '-shade',
        hex: generatedColors[name + '_shade'],
      },
      contrast: {
        name: name + '-contrast',
        hex: generatedColors[name + '_contrast'],
      },
    }));
  }
}
