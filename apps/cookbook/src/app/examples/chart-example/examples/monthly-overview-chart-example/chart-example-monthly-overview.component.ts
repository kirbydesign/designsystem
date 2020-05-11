import { Component, OnInit, ViewChild } from '@angular/core';
import { Options, SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';

import { ModalController, DesignTokenHelper, ChartComponent } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;
const fontSize = DesignTokenHelper.fontSize;

function colorPoints(selectedIdx) {
  return function() {
    var series = this.series;
    for (var i = 0, ie = series.length; i < ie; ++i) {
      var points = series[i].data;
      for (var j = 0, je = points.length; j < je; ++j) {
        if (points[j].graphic) {
          if (j === selectedIdx) {
            points[j].graphic.element.style.fill = getColor('primary').value;
            points[j].graphic.element.style.stroke = getColor('primary').value;
          } else {
            points[j].graphic.element.style.stroke = getColor('secondary').value;
          }
        }
      }
    }
  };
}

const config = {
  selector: 'cookbook-chart-example-monthly-overview',
  template: `<kirby-chart [height]="height" [options]="monthlyOverviewOptions"> </kirby-chart>`,
  codeSnippet: `
  monthlyOverviewOptions: Options = {
    chart: {
      animation: {
        duration: 500,
      },
      height: this.height,
      backgroundColor: 'transparent',
      type: 'column',
      events: {
        load: colorPoints(this.selectedIdx),
        redraw: colorPoints(this.selectedIdx),
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      labels: {
        style: {
          fontSize: fontSize('xxs'),
          fontFamily: 'roboto',
          color: getColor('black').value,
        },
      },
      categories: this.categories,
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
        var positions = [0, this.maxValue];

        return positions;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        events: {
          click: this.monthlyOverviewClick.bind(this),
        },
      },
      series: {
        color: getColor('secondary').value,
        zIndex: 10,
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
        name: 'InvisibleClickReceiver',
        data: this.adjustedMonthlyExpenseData.map(
          (_, idx) => this.maxValue - this.adjustedMonthlyExpenseData[idx]
        ),
        opacity: 0,
      },
      {
        type: 'column',
        data: this.adjustedMonthlyExpenseData,
      },
    ],
  };
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleMonthlyOverviewComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 150;

  private categories = [
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
  ];
  private monthlyExpenseData = [0, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600];
  private maxValue = Math.max(...this.monthlyExpenseData);
  private selectedIdx = 0;

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

    this.selectedIdx = this.categories.indexOf(ev.point.category);
    this.monthlyOverviewOptions.plotOptions.series.animation = false;
    this.monthlyOverviewOptions.chart.events.load = colorPoints(this.selectedIdx);
    this.monthlyOverviewOptions.chart.events.redraw = colorPoints(this.selectedIdx);
    this.monthlyOverviewOptions = { ...this.monthlyOverviewOptions };
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
        load: colorPoints(this.selectedIdx),
        redraw: colorPoints(this.selectedIdx),
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      labels: {
        style: {
          fontSize: fontSize('xxs'),
          fontFamily: 'roboto',
          color: getColor('black').value,
        },
      },
      categories: this.categories,
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
        var positions = [0, this.maxValue];

        return positions;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        events: {
          click: this.monthlyOverviewClick.bind(this),
        },
      },
      series: {
        color: getColor('secondary').value,
        zIndex: 10,
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
        name: 'InvisibleClickReceiver',
        data: this.adjustedMonthlyExpenseData.map(
          (_, idx) => this.maxValue - this.adjustedMonthlyExpenseData[idx]
        ),
        opacity: 0,
      },
      {
        type: 'column',
        data: this.adjustedMonthlyExpenseData,
      },
    ],
  };

  constructor(private modalController: ModalController) {}
}
