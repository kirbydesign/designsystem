import { Component, OnInit, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';
import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-chip-example',
  templateUrl: './chip-example.component.html',
  styleUrls: ['./chip-example.component.scss'],
})
export class ChipExampleComponent {
  activeTab = 'default';
  @Input() themeColor: ThemeColor | '' = '';
  colors: Color[] = ColorHelper.getMainColors();
  items = [
    { text: 'Card color: None', value: '' },
    ...this.colors
      .filter((color) => ['light', 'dark'].includes(color.name))
      .map((color) => {
        return {
          text: `Card color: ${color.name}`,
          value: color.name,
        };
      }),
  ];

  onSegmentSelect(segment) {
    this.activeTab = segment.id;
  }
}
