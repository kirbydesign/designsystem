import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal } from '@kirbydesign/designsystem';

@Component({
  template: `
    <button kirby-button class="nav" attentionLevel="3" [routerLink]="['../page2']">
      Page 2
      <kirby-icon name="arrow-more"></kirby-icon>
    </button>
    <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <button kirby-button (click)="close()">Hide me</button>
  `,
  styles: [
    ':host { display: flex; flex-direction: column; align-items: flex-start; }',
    'button[kirby-button].nav { align-self: flex-end; }',
    'h4 { margin-top: 24px; } ',
  ],
})
export class ModalRoutePage1ExampleComponent {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  close() {
    let someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }
}
