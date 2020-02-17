import { Component } from '@angular/core';

import { icons } from '@kirbydesign/designsystem';
import { Icon } from '@kirbydesign/designsystem';
import { Sizes } from '@kirbydesign/designsystem';
import { Color, ColorHelper } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons: Icon[] = icons;
  sizes = Sizes;
  color: Color;
  colors: Color[] = ColorHelper.getMainColors();

  changeColor(color: Color) {
    this.color = color;
  }
}
