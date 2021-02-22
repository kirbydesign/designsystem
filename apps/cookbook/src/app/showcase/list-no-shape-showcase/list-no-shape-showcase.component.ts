import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-list-no-shape-showcase',
  templateUrl: './list-no-shape-showcase.component.html',
  styleUrls: ['./list-no-shape-showcase.component.scss'],
})
export class ListNoShapeShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list-no-shape-example/list-no-shape-example.component.html')
    .default;
}
