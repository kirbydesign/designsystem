import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-grid-layout-core-showcase',
  templateUrl: './grid-layout-core-showcase.component.html',
  styleUrls: ['./grid-layout-core-showcase.component.scss'],
})
export class GridLayoutCoreShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../../../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.html')
    .default;
}
