import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  styleUrls: ['./modal-showcase.component.scss'],
})
export class ModalShowcaseComponent {
  exampleHtml: string = require('../../examples/modal-example/modal-example.component.html');
}
