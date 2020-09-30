import { Directive, HostBinding, Input } from '@angular/core';

import { NotificationColor } from '../../../helpers/color-helper';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'button[themeColor][checked], button[themeColor][unchecked]',
})
export class ToggleButtonThemeColorDirective {
  @HostBinding('class')
  @Input()
  themeColor: NotificationColor;
}
