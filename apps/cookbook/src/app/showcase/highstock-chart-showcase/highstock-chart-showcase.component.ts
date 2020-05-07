import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-highstock-chart-showcase',
  templateUrl: './highstock-chart-showcase.component.html',
  styleUrls: ['./highstock-chart-showcase.component.scss'],
})
export class HighstockChartShowcaseComponent implements OnInit {
  exampleHtml: string = require('!raw-loader!../../examples/highstock-chart-example/highstock-chart-example.component.html')
    .default;

  constructor() {}

  ngOnInit() {}
}
