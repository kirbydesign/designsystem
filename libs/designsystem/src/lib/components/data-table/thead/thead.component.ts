import { Component, ElementRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'thead[kirbyThead]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./thead.component.scss'],
})
export class TheadComponent {
  constructor() {}
}
