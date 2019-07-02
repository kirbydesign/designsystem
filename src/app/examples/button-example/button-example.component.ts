import { Component, Input } from '@angular/core';

import { ThemeColor } from './../../../kirby/helpers/theme-color.type';
import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  activeTab = 'default';
  @Input() themeColor: ThemeColor | '' = '';
  colors: Color[] = ColorHelper.getMainColors();
  items = [
    { text: 'Card color: None', value: '' },
    ...this.colors.map((color) => {
      return {
        text: `Card color: ${color.name}`,
        value: color.name,
      };
    }),
  ];

  onSegmentClick(segment) {
    this.activeTab = segment.id;
  }
}
