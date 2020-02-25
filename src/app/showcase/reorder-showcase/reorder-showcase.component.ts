import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-reorder-showcase',
  templateUrl: './reorder-showcase.component.html',
  styleUrls: ['./reorder-showcase.component.scss'],
})
export class ReorderShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/reorder/reorder-list-example.component.html')
    .default;
}
