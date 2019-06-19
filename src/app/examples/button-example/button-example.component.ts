import { Component, Input } from '@angular/core';

import { ThemeColor } from './../../../kirby/helpers/theme-color.type';

@Component({
  selector: 'kirby-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  activeTab = 'default';
  @Input() themeColor: ThemeColor | '' = '';
  items = [
    { text: '[None]', value: '' },
    { text: 'primary', value: 'primary' },
    { text: 'secondary', value: 'secondary' },
    { text: 'tertiary', value: 'tertiary' },
    { text: 'success', value: 'success' },
    { text: 'warning', value: 'warning' },
    { text: 'danger', value: 'danger' },
    { text: 'light', value: 'light' },
    { text: 'medium', value: 'medium' },
    { text: 'dark', value: 'dark' },
  ];

  onSegmentClick(segment) {
    this.activeTab = segment.id;
  }
}
