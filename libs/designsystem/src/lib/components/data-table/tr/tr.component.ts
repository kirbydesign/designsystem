import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirby-tr]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./tr.component.scss'],
})
export class TrComponent {
  constructor() {}
}
