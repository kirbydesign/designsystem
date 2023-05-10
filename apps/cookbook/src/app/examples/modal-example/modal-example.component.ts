import { Component } from '@angular/core';

@Component({
  template: `
    <h2>Default</h2>
    <cookbook-modal-example-default></cookbook-modal-example-default>
    <h2>Outlet</h2>
    <cookbook-modal-example-outlet></cookbook-modal-example-outlet>
  `,
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {}
