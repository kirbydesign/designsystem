import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kirby-input-postfix',
  template:
    '<span class="input-prepend prefix-postfix" [ngClass]="cssClass"><ng-content></ng-content></span>',
  styleUrls: ['./input-postfix.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputPostfixComponent {
  @Input()
  cssClass: string;
}
