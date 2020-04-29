import { Component, OnInit } from '@angular/core';
import { Options, SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';

import { DesignTokenHelper, ModalController } from '@kirbydesign/designsystem';

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
  private monthlyExpenseData = [10, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600];
  private monthlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
    this.modalController.showAlert({
      title: 'Clicked chart',
      message: 'You clicked on column: ' + ev.point.category,
      okBtnText: 'Ok',
    });
  };
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
    yAxis: {
      title: {
        text: '',
      },
      plotLines: [
        {
          width: 2,
          color: getColor('secondary').value,
          dashStyle: 'Dash',
          value: 872,
        },
      ],
      labels: {
        padding: 0,
        overflow: 'justify',
        x: 30,
        y: -10,
      },
      min: 0,
      tickAmount: 2,
      showLastLabel: true,
      showFirstLabel: false,
      tickPositioner: function() {
        var positions = [0, 1400];

        return positions;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        events: {
          click: this.monthlyOverviewClick.bind(this),
        },
      },
      series: {
        color: getColor('secondary').value,
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
      },
      line: {
        className: 'avg-line',
        marker: {
          enabled: false,
        },
        allowPointSelect: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'column',
        data: this.monthlyExpenseData,
      },
    ],
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}
}
