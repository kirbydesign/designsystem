import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { InputSize } from '../input/input.component';

@Component({
  selector: 'kirby-input-postfix',
  template:
    '<span class="prefix-postfix input-append" [ngClass]="cssClass"><ng-content></ng-content></span>',
  styleUrls: ['./input-prefix-postfix.component.scss'],
})
export class InputPostfixComponent {
  @Input()
  cssClass: string;

  @HostBinding('class')
  @Input()
  size: InputSize = InputSize.large;
}
