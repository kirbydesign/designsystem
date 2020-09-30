import { Directive, HostBinding, Input } from '@angular/core';

import { NotificationColor } from '../../../helpers/color-helper';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'button[color]',
})
export class ToggleButtonColorDirective {
  @HostBinding('class')
  @Input()
  color: NotificationColor;
}
