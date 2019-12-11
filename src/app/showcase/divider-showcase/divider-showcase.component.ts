import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-divider-showcase',
  templateUrl: './divider-showcase.component.html',
  styleUrls: ['./divider-showcase.component.scss'],
})
export class DividerShowcaseComponent {
  themeColors = ['white', 'light'];
  themeColor = 'white';
  hasMargin = false;

  exampleHtml: string = require('!raw-loader!../../examples/divider-example/divider-example.component.html')
    .default;

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }

  onMarginChange(hasMargin) {
    this.hasMargin = hasMargin;
  }
}
