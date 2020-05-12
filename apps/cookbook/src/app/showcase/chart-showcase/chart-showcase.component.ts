import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
})
export class ChartShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/chart-example/chart-example.component.html')
    .default;
}
