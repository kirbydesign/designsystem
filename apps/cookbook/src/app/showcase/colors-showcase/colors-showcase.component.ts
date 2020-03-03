import { Component } from '@angular/core';

import { SassColor } from '@kirbydesign/designsystem';

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
  textColors = [];

  constructor() {
    this.brandColors = this.getColors('$brand_colors');
    this.systemColors = this.getColors('$system_colors');
    this.notificationColors = this.getColors('$notification_colors');
    this.textColors = this.getColors('$text_colors');
  }

  onColorClick(sassColor: SassColor) {
    this.selectedColor = sassColor.name;
    this.selectedOnColor = sassColor.name + '-contrast';
  }

  private getColors(colorType: string) {
    const mainColors = style[colorType];
    const generatedColors = style.$kirby_colors;
    return Object.entries(mainColors).map(([variableName, value]) => {
      const scssName = variableName.replace(/_/g, '-');
      return {
        name: scssName,
        value,
        tint: {
          name: `${scssName}-tint`,
          hex: generatedColors[`${variableName}_tint`],
        },
        shade: {
          name: `${scssName}-shade`,
          hex: generatedColors[`${variableName}_shade`],
        },
        contrast: {
          name: `${scssName}-contrast`,
          hex: generatedColors[`${variableName}_contrast`],
        },
      };
    });
  }
}
