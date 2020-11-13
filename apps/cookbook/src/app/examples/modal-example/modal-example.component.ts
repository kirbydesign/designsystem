import { Component } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types/window-ref';

@Component({
  template: `
    <kirby-page>
      <h1 *kirbyPageTitle>
        Modal
        <span class="mobile">(mobile)</span>
      </h1>
      <kirby-page-content>
        <h2>Default</h2>
        <cookbook-modal-example-default></cookbook-modal-example-default>
        <h2>Outlet</h2>
        <cookbook-modal-example-outlet></cookbook-modal-example-outlet>
        <fieldset>
          <legend>Configuration</legend>
          <kirby-checkbox
            [checked]="showDummyKeyboard"
            (checkedChange)="toggleDummyKeyboard($event)"
          ></kirby-checkbox>
          <label (click)="showDummyKeyboard = !showDummyKeyboard">Show dummy keyboard</label>
        </fieldset>
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(private window: WindowRef) {}

  showDummyKeyboard = !!this.window.sessionStorage.getItem('kirby-cookbook-show-dummy-keyboard');

  toggleDummyKeyboard(show: boolean) {
    this.showDummyKeyboard = show;
    this.window.dispatchEvent(new CustomEvent('kirbyToggleDummyKeyboard'));
  }
}
