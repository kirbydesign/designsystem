import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-layout-recipes-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
})
export class GridLayoutComponent {
  exampleHtml: string = require('!raw-loader!../../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.html')
    .default;
  exampleCss: string = require('!raw-loader!../../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.scss')
    .default;
}
