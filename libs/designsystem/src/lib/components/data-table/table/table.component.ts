import { Component, ElementRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirbyTable]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(private element: ElementRef) {}
}
