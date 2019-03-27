import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-fullscreen-modal-showcase',
  templateUrl: './fullscreen-modal-showcase.component.html',
  styleUrls: ['./fullscreen-modal-showcase.component.scss'],
})
export class FullscreenModalShowcaseComponent {
  exampleHtml: string = require('../../examples/fullscreen-modal-example/fullscreen-modal-example.component.html');
}
