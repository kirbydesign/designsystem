import { Component } from '@angular/core';

import { icons } from '@kirbydesign/designsystem/components/icon/icon.component';
import { Icon } from '@kirbydesign/designsystem/components/icon/icon-settings';
import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

@Component({
  selector: 'kirby-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons: Icon[] = icons;
  sizes = Sizes;
  color: string;
  outline: boolean;

  changeColor(color: string) {
    this.color = color;
  }

  onOutlineChecked(checked) {
    this.outline = checked;
  }
}
