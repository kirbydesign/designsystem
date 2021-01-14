import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kirby-input-prefix',
  template:
    '<span class="input-prepend prefix-postfix" [ngClass]="cssClass"><ng-content></ng-content></span>',
  styleUrls: ['./input-prefix.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputPrefixComponent {
  @Input()
  cssClass: string;
}
