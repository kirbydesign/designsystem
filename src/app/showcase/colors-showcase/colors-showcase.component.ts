import { Component } from '@angular/core';

import { SassColor } from '../../../kirby/scss/scss-helper';

declare var require;
const style = require('sass-extract-loader!./colors-showcase.component.scss');

@Component({
  selector: 'kirby-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  colorPalette = [];

  constructor() {
    this.colorPalette = this.getThemeColors();
  }

  onColorClick(sassColor: SassColor) {
    this.selectedColor = sassColor.name;
    this.selectedOnColor = sassColor.name + '-contrast';
  }

  private getThemeColors() {
    const colors = [];
    const mainColors = style.global['$main-colors'].value;
    const generatedColors = style.global['$kirby-colors'].value;
    for (const [value, type] of Object.entries(mainColors)) {
      const sassColor = <SassColor>type;
      sassColor.name = value;
      sassColor.tint = {
        name: value + '-tint',
        hex: generatedColors[sassColor.name + '-tint'].value,
      };
      sassColor.shade = {
        name: value + '-shade',
        hex: generatedColors[sassColor.name + '-shade'].value,
      };
      sassColor.contrast = {
        name: value + '-contrast',
        hex: generatedColors[sassColor.name + '-contrast'].value,
      };
      colors.push(sassColor);
    }
    return colors;
  }
}
