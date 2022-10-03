import { Component, ElementRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tfoot[kirbyTfoot]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tfoot.component.scss'],
})
export class TfootComponent {
  constructor() {}
}
