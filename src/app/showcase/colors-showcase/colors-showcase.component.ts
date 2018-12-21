import { Component, OnInit } from '@angular/core';
import {SassColor} from '../../../kirby/scss/scss-helper';

declare var require;
const styleDerp = require('sass-extract-loader!./colors-showcase.component.scss');

@Component({
  selector: 'kirby-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss']
})
export class ColorsShowcaseComponent implements OnInit {

  colorPalette = [];

  constructor() {
    console.log(styleDerp);
    this.colorPalette = this.getThemeColors('default');
  }

  ngOnInit() {
  }

  getThemeColors(theme: string) {
    const colors = [];
    const defaultColors = styleDerp.global['$themes'].value[theme].value;
    for (const [value, type] of Object.entries(defaultColors)) {
      const sassColor = <SassColor>type;
      colors.push({name: value, color: sassColor.value.hex});
    }
    return colors;
  }

}
