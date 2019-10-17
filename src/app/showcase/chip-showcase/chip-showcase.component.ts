import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-chip-showcase',
  templateUrl: './chip-showcase.component.html',
  styleUrls: ['./chip-showcase.component.scss'],
})
export class ChipShowcaseComponent implements OnInit {
  themeColors = ['light', 'dark'];
  themeColor = '';
  exampleHtml: string = require('!raw-loader!../../examples/chip-example/chip-example.component.html')
    .default;

  constructor() {}

  ngOnInit() {}

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }
}
