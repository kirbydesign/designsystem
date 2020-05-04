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
        if (points[j].category === '2019') {
          points[j].graphic.element.style.fill = getColor('primary').value;
        }
      }
    }
  }
}

@Component({
  selector: 'cookbook-yearly-overview-chart-example',
  templateUrl: './yearly-overview-chart-example.component.html',
  styleUrls: ['./yearly-overview-chart-example.component.scss'],
})
export class YearlyOverviewChartExampleComponent implements OnInit {
  height = 200;

  private wholeYearExpensesData = [960, 8761, 7760];
  private currentTimeData = [0, 1000, 800];
  private years = [2018, 2019, 2020].reverse();

  private yearlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
    this.modalController.showAlert({
      title: 'Clicked chart',
      message: 'You clicked on year: ' + ev.point.category,
      okBtnText: 'Ok',
    });
  };

  yearlyOverviewOptions: Options = {
    chart: {
      type: 'bar',
      animation: {
        duration: 500,
      },
      height: this.height,
      backgroundColor: 'transparent',
      events: {
        load: colorPoints,
        redraw: colorPoints,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: this.years.map((year) => year.toString()),
      labels: {
        style: {
          fontSize: fontSize('xxs'),
          fontFamily: 'roboto',
          color: getColor('black').value,
        },
      },
      min: 0,
      lineColor: 'transparent',
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
      min: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      maxPadding: 0,
      endOnTick: false,
      showLastLabel: false,
      showFirstLabel: false,
    },
    plotOptions: {
      bar: {
        events: {
          click: this.yearlyOverviewClick.bind(this),
        },
      },
      series: {
        color: getColor('secondary').value,
        stacking: 'overlap',
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
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
        name: 'WholeYearExpenses',
        data: this.wholeYearExpensesData,
        color: getColor('secondary').value,
      },
      {
        name: 'CurrentTimeExpsenses',
        data: this.currentTimeData,
      },
    ] as any,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}
}
