import { Component } from '@angular/core';

import { defaultIcons } from '@kirbydesign/designsystem';
import { Sizes } from '@kirbydesign/designsystem';
import { Color, ColorHelper } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons = defaultIcons;
  sizes = Sizes;
  color: Color;
  colors: Color[] = ColorHelper.mainColors;

  changeColor(color: Color) {
    this.color = color;
  }
}
