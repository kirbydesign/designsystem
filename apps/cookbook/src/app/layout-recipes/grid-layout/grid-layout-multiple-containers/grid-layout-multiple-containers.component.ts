import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-grid-layout-multiple-containers',
  templateUrl: './grid-layout-multiple-containers.component.html',
  styleUrls: ['./grid-layout-multiple-containers.component.scss'],
})
export class GridLayoutMultipleContainersComponent {
  exampleHtml: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.html')
    .default;
  exampleCss: string = require('!raw-loader!../../../examples/grid-layout-example/grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component.scss')
    .default;
}
