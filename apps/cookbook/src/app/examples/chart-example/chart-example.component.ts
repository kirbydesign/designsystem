import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';

@Component({
  selector: 'cookbook-chart-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss'],
})
export class ChartExampleComponent implements OnInit {
  constructor() {}

  monthlyOverviewOptions: Options = {
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: [
        'mar',
        'apr',
        'maj',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'dec',
        'jan',
        'feb',
      ],
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Previous',
        data: [10, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 0],
      },
      {
        name: 'Current',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 600],
      },
    ] as any,
  };
  // TODO: set color kirby green and light green
  // TODO: center line
  // TODO: avg line
  // TODO: click alert when click a column

  ngOnInit() {}
}
