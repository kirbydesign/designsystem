import { Component } from '@angular/core';

import exampleHtml from '../../examples/divider-example/divider-example.component.html?raw';

@Component({
  selector: 'cookbook-divider-showcase',
  templateUrl: './divider-showcase.component.html',
})
export class DividerShowcaseComponent {
  themeColors = ['white', 'light'];
  themeColor = 'white';
  hasMargin = false;

  exampleHtml = exampleHtml;

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }

  onMarginChange(hasMargin) {
    this.hasMargin = hasMargin;
  }
}
