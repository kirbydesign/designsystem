import { Component } from '@angular/core';

import { defaultIcons } from '@kirbydesign/designsystem';
import { Color, ColorHelper } from '@kirbydesign/designsystem';
import { IconSizes } from '@kirbydesign/designsystem/components/icon/icon.component';

@Component({
  selector: 'cookbook-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons = defaultIcons;
  sizes = IconSizes;
  color: Color;
  colors: Color[] = ColorHelper.mainColors;

  changeColor(color: Color) {
    this.color = color;
  }
}
