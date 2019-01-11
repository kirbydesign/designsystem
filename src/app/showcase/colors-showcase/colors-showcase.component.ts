import { Component, OnInit } from '@angular/core';
import {SassColor} from '../../../kirby/scss/scss-helper';

declare var require;
const style = require('sass-extract-loader!./colors-showcase.component.scss');

@Component({
  selector: 'kirby-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss']
})
export class ColorsShowcaseComponent implements OnInit {

  selectedColor = 'kirby-background';
  selectedOnColor = 'kirby-on-background';
  activeColorType = 'bg';
  colorPalette = [];

  constructor() {
    this.colorPalette = this.getThemeColors('default');
  }

  ngOnInit() {
  }

  onColorClick(sassColor: SassColor) {
    if (this.activeColorType === 'bg') {
      this.selectedColor = sassColor.name;
    } else {
      this.selectedOnColor = sassColor.name;
    }
  }

  // TODO TRM: Make this a general method to get colors
  getThemeColors(theme: string) {
    const colors = [];
    const defaultColors = style.global['$themes'].value[theme].value;
    for (const [value, type] of Object.entries(defaultColors)) {
      const sassColor = <SassColor>type;
      sassColor.name = value;
      colors.push(sassColor);
    }
    return colors;
  }
}

