import { Component, ElementRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirbyTr]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./tr.component.scss'],
})
export class TrComponent {
  constructor(private element: ElementRef) {}
}
