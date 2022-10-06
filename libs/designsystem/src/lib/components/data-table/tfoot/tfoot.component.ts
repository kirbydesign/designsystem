import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tfoot[kirby-tfoot]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tfoot.component.scss'],
})
export class TableTfootComponent {
  constructor() {}
}
