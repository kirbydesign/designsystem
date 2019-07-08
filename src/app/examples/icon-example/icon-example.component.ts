import { Component } from '@angular/core';

import { icons } from '@kirbydesign/designsystem/components/icon/icon.component';
import { Icon } from '@kirbydesign/designsystem/components/icon/icon-settings';
import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';
import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons: Icon[] = icons;
  sizes = Sizes;
  color: Color;
  colors: Color[] = ColorHelper.getMainColors();
  outline: boolean;

  changeColor(color: Color) {
    this.color = color;
  }

  onOutlineChecked(checked) {
    this.outline = checked;
  }
}
