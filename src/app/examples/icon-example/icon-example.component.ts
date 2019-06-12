import { Component } from '@angular/core';

import { icons } from '@kirbydesign/designsystem/components/icon/icon.component';
import { CustomIcon } from '@kirbydesign/designsystem/components/icon/custom-icon-settings';
import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

@Component({
  selector: 'kirby-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons: CustomIcon[] = icons;
  sizes = Sizes;

  defaultIconsCodeExample = `<kirby-icon name="NAME"></kirby-icon>`;
}
