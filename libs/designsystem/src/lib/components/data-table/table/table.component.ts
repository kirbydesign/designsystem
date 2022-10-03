import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirby-table]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor() {}
}
