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
  exampleHtml: string = require('../../examples/divider-example/divider-example.component.html');

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }
}
