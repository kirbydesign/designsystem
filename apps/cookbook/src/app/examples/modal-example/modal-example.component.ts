import { Component } from '@angular/core';
import { ModalExampleSimpleComponent } from './modal-example-simple.component';

@Component({
  template: `
    <h2>Basic usage</h2>
    <cookbook-modal-example-simple></cookbook-modal-example-simple>
  `,
  styleUrls: ['../_examples.shared.scss'],
  imports: [ModalExampleSimpleComponent],
})
export class ModalExampleComponent {}
