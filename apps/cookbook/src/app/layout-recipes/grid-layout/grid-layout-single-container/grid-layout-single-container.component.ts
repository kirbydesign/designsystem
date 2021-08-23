import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-grid-layout-single-container',
  templateUrl: './grid-layout-single-container.component.html',
  styleUrls: ['./grid-layout-single-container.component.scss'],
})
export class GridLayoutSingleContainerComponent {
  exampleHtml: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.html')
    .default;
  exampleCss: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-single-container-example/grid-layout-single-container-example.component.scss')
    .default;
}
