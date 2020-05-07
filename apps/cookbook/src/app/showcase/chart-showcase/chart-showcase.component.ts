import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
  styleUrls: ['./chart-showcase.component.scss'],
})
export class ChartShowcaseComponent implements OnInit {
  monthlyChartHtml: string = require('!raw-loader!../../examples/chart-example/examples/monthly-overview-chart-example/monthly-overview-chart-example.component.html')
    .default;
  yearlyChartHtml: string = require('!raw-loader!../../examples/chart-example/examples/yearly-overview-chart-example/yearly-overview-chart-example.component.html')
    .default;

  constructor() {}

  ngOnInit() {}
}
