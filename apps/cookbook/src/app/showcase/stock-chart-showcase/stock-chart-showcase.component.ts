import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-highstock-chart-showcase',
  templateUrl: './stock-chart-showcase.component.html',
  styleUrls: ['./stock-chart-showcase.component.scss'],
})
export class StockChartShowcaseComponent implements OnInit {
  exampleHtml: string = require('!raw-loader!../../examples/stock-chart-example/stock-chart-example.component.html')
    .default;

  constructor() {}

  ngOnInit() {}
}
