import { Component } from '@angular/core';

@Component({
  template: `
    <h2>Basic usage</h2>
    <cookbook-modal-example-sizes></cookbook-modal-example-sizes>
    <h2>Outlet</h2>
    <cookbook-modal-example-outlet></cookbook-modal-example-outlet>
  `,
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {}
