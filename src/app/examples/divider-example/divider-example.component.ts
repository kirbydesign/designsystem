import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';
import { Color, ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

@Component({
  selector: 'kirby-divider-example',
  templateUrl: './divider-example.component.html',
  styleUrls: ['./divider-example.component.scss'],
})
export class DividerExampleComponent {
  @Input() themeColor: ThemeColor = 'white';
  @Input() hasMargin: boolean = true;
}
