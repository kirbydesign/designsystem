import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-layout-showcase',
  templateUrl: './layout-showcase.component.html',
  styleUrls: ['./layout-showcase.component.scss'],
})
export class LayoutShowcaseComponent {
  gridLayoutCoreExampleHtml: string = require('!raw-loader!../../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.html')
    .default;
}
