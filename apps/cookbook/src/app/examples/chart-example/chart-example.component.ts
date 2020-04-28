import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';

import { DesignTokenHelper } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;

function colorPoints() {
  var series = this.series;
  for (var i = 0, ie = series.length; i < ie; ++i) {
    var points = series[i].data;
    for (var j = 0, je = points.length; j < je; ++j) {
      if (points[j].graphic) {
        if (j === points.length - 1) {
          points[j].graphic.element.style.fill = getColor('primary').value;
          points[j].graphic.element.style.stroke = getColor('primary').value;
        }
      }
    }
  }
}

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
      events: {
        load: colorPoints,
        redraw: colorPoints,
      },
    },
    title: {
      text: 'February 2020',
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
    plotOptions: {
      series: {
        color: getColor('secondary').value,
      },
    },
    series: [
      {
        data: [10, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600],
      },
    ] as any,
  };
  // TODO: avg line
  // TODO: click alert when click a column
  // Remove axis texts

  ngOnInit() {}
}
