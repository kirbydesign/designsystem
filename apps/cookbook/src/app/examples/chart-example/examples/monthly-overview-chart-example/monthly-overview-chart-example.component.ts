import { Component, OnInit } from '@angular/core';
import { Options, SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';

import { ModalController, DesignTokenHelper } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;
const fontSize = DesignTokenHelper.fontSize;

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
  selector: 'cookbook-monthly-overview-chart-example',
  templateUrl: './monthly-overview-chart-example.component.html',
  styleUrls: ['./monthly-overview-chart-example.component.scss'],
})
export class MonthlyOverviewChartExampleComponent implements OnInit {
  height = 150;

  private monthlyExpenseData = [0, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600];

  // lower limit is shown as 2% of max value for UX reasons
  private lowerLimit = Math.max(...this.monthlyExpenseData) * 0.02;
  private adjustedMonthlyExpenseData = this.monthlyExpenseData.map((data) =>
    this.lowerLimit >= data ? this.lowerLimit : data
  );

  private monthlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
    this.modalController.showAlert({
      title: 'Clicked chart',
      message: 'You clicked on column: ' + ev.point.category,
      okBtnText: 'Ok',
    });
  };
  monthlyOverviewOptions: Options = {
    chart: {
      animation: {
        duration: 500,
      },
      height: this.height,
      backgroundColor: 'transparent',
      type: 'column',
      events: {
        load: colorPoints,
        redraw: colorPoints,
      },
    },
    title: {
      text: '',
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
      labels: {
        style: {
          fontSize: fontSize('xxs'),
          fontFamily: 'roboto',
          color: getColor('black').value,
        },
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
    },
    yAxis: {
      title: {
        text: '',
      },
      plotLines: [
        {
          width: 1,
          color: getColor('semi-dark').value,
          dashStyle: 'Dash',
          value: 872,
        },
      ],
      labels: {
        enabled: false,
      },
      min: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      showLastLabel: false,
      showFirstLabel: false,
      tickPositioner: () => {
        var positions = [0, Math.max(...this.adjustedMonthlyExpenseData)];

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
        data: this.adjustedMonthlyExpenseData,
      },
    ],
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}
}
