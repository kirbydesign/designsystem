import { Directive, HostBinding } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'kirby-button[disabled]',
})
export class DisabledDirective {
  @HostBinding('class.disabled')
  isDisabled: boolean = true;
}
