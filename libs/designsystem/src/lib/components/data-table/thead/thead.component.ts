import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'thead[kirby-thead]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./thead.component.scss'],
})
export class TheadComponent {
  constructor() {}
}
