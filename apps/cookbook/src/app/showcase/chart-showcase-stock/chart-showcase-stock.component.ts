import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-highstock-chart-showcase',
  templateUrl: './chart-showcase-stock.component.html',
  styleUrls: ['./chart-showcase-stock.component.scss'],
})
export class ChartShowcaseStockComponent implements OnInit {
  exampleHtml: string = require('!raw-loader!../../examples/chart-example-stock/chart-example-stock.component.html')
    .default;

  constructor() {}

  ngOnInit() {}
}
