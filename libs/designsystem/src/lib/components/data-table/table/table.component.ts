import { Component, HostBinding, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirby-table]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @HostBinding('class.--kirby-table-layout-fixed') @Input() fixedLayout: boolean = false;
}
