import { Component } from '@angular/core';

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
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {}
