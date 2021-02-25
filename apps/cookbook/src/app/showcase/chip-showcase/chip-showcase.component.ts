import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-chip-showcase',
  templateUrl: './chip-showcase.component.html',
  styleUrls: ['./chip-showcase.component.scss'],
})
export class ChipShowcaseComponent {
  themeColors = [
    { text: 'None', value: '' },
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
  ];
  themeColor = '';

  linkToProperties = true;

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }
}
