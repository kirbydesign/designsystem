import { Component } from '@angular/core';

@Component({
  template: `
    <kirby-page>
      <h1 *kirbyPageTitle>
        Modal
        <span class="mobile">(mobile)</span>
      </h1>
      <kirby-page-content>
        <cookbook-modal-example></cookbook-modal-example>
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: ['./modal-example-popout.component.scss'],
})
export class ModalExamplePopoutComponent {}
