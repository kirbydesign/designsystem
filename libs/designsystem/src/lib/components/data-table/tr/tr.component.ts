import { Component, HostBinding, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirby-tr]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./tr.component.scss'],
})
export class TableRowComponent {
  @HostBinding('class.selectable') @Input() selectable: boolean = false;

  constructor() {}
}
