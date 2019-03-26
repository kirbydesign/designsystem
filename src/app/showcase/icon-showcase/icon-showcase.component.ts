import { Component } from '@angular/core';

declare var require: any;

@Component({
  selector: 'kirby-icon-showcase',
  templateUrl: './icon-showcase.component.html',
})
export class IconShowcaseComponent {
  exampleHtml: string = require('../../examples/icon-example/icon-example.component.html');
}
