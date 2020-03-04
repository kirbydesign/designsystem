import { Component } from '@angular/core';

import { ColorHelper, GroupedColors, RgbColor, SassColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  brandColors: SassColor[];
  systemColors: SassColor[];
  notificationColors: SassColor[];
  textColors: SassColor[];

  constructor() {
    this.brandColors = this.getColors(ColorHelper.getBrandColors());
    this.systemColors = this.getColors(ColorHelper.getSystemColors());
    this.notificationColors = this.getColors(ColorHelper.getNotificationColors());
    this.textColors = this.getColors(ColorHelper.getTextColors());
  }

  onColorClick(sassColor: SassColor) {
    this.selectedColor = sassColor.name;
    this.selectedOnColor = sassColor.name + '-contrast';
  }

  private getColors(groupedColors: GroupedColors): SassColor[] {
    const colors: SassColor[] = [];
    const generatedColors = ColorHelper.getGeneratedColors();

    for (const [key, color] of Object.entries(groupedColors)) {
      const kebabCaseKey = ColorHelper.camelToKebabCase(key);
      const tint = generatedColors[`${key}Tint`];
      const shade = generatedColors[`${key}Shade`];
      const contrast = generatedColors[`${key}Contrast`];

      colors.push({
        name: kebabCaseKey,
        hex: typeof color === 'string' ? color : color.hex,
        tint: {
          name: `${kebabCaseKey}-tint`,
          hex: typeof tint === 'string' ? tint : tint.hex,
        },
        shade: {
          name: `${kebabCaseKey}-shade`,
          hex: typeof shade === 'string' ? shade : shade.hex,
        },
        contrast: {
          name: `${kebabCaseKey}-contrast`,
          hex: typeof contrast === 'string' ? contrast : contrast.hex,
        },
      });
    }
    return colors;
  }
}
