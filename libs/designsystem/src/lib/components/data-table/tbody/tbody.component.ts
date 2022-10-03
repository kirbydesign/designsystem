import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tbody[kirby-tbody]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tbody.component.scss'],
})
export class TbodyComponent {
  constructor() {}
}
