import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-grid-layout-extended-showcase',
  templateUrl: './grid-layout-extended-showcase.component.html',
  styleUrls: ['./grid-layout-extended-showcase.component.scss'],
})
export class GridLayoutExtendedShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../../../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.html')
    .default;
}
