import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-grid-layout-extended',
  templateUrl: './grid-layout-extended.component.html',
  styleUrls: ['./grid-layout-extended.component.scss'],
})
export class GridLayoutExtendedComponent {
  exampleHtml: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.html')
    .default;
  exampleCss: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component.scss')
    .default;
}
