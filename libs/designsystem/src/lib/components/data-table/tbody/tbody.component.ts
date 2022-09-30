import { Component, ElementRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tbody[kirbyTbody]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tbody.component.scss'],
})
export class TbodyComponent {
  constructor(private element: ElementRef) {}
}
