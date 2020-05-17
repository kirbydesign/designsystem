import { Component } from '@angular/core';
import { Options, SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';

import { ModalController, DesignTokenHelper } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;

function colorPoints(selectedYear: string) {
  return function() {
    var series = this.series;
    for (var i = 0, ie = series.length; i < ie; ++i) {
      var points = series[i].data;
      for (var j = 0, je = points.length; j < je; ++j) {
        if (points[j].graphic) {
          if (points[j].category === selectedYear) {
            points[j].graphic.element.style.fill = getColor('primary').value;
          }

          points[j].graphic.element.style.stroke = getColor('background-color').value;
        }
      }
    }
  };
}

const config = {
  selector: 'cookbook-chart-example-bar',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>
  <kirby-chart
    [height]="height"
    type="bar"
    [categories]="categories"
    [options]="yearlyOverviewOptions">
  </kirby-chart>
</kirby-card>`,
  codeSnippet: `private yearlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
  this.modalController.showAlert({
    title: 'Clicked chart',
    message: 'You clicked on year: ' + ev.point.category,
    okBtnText: 'Ok',
  });

  this.selectedYear = ev.point.category;
  this.yearlyOverviewOptions.plotOptions.series.animation = false;
  this.yearlyOverviewOptions.chart.events.load = colorPoints(this.selectedYear);
  this.yearlyOverviewOptions.chart.events.redraw = colorPoints(this.selectedYear);
  this.yearlyOverviewOptions = { ...this.yearlyOverviewOptions };
};

yearlyOverviewOptions: Options = {
  chart: {
    events: {
      load: colorPoints(this.selectedYear),
      redraw: colorPoints(this.selectedYear),
    },
  },
  plotOptions: {
    series: {},
    bar: {
      events: {
        click: this.yearlyOverviewClick.bind(this),
      },
    },
  },
  series: [
    {
      name: 'InvisibleClickReceiver',
      data: this.adjustedYearExpensesData.map(
        (wholeYearData, idx) => this.maxValue - (wholeYearData + this.currentTimeData[idx])
      ),
      edgeColor: 'rgb(255, 255, 255, 0)',
      opacity: 0,
    },
    {
      name: 'WholeYearExpenses',
      data: this.adjustedYearExpensesData,
    },
    {
      name: 'CurrentTimeExpsenses',
      data: this.currentTimeData,
    },
  ] as any,
};`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleBarComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 150;

  private yearExpensesData = [0, 8761, 7760];
  private currentTimeData = [0, 1000, 800];
  private maxValue = Math.max(...this.yearExpensesData) + Math.max(...this.currentTimeData);
  private years = [2018, 2019, 2020].reverse();
  categories = this.years.map((year) => year.toString());
  private selectedYear = this.categories[0];
  private lowerLimit = Math.max(...this.yearExpensesData) * 0.01;
  // lower limit is shown as 2% of max value for UX reasons
  private adjustedYearExpensesData = this.yearExpensesData.map((data) =>
    this.lowerLimit >= data ? this.lowerLimit : data
  );

  private yearlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
    this.modalController.showAlert({
      title: 'Clicked chart',
      message: 'You clicked on year: ' + ev.point.category,
      okBtnText: 'Ok',
    });

    this.selectedYear = ev.point.category;
    this.yearlyOverviewOptions.plotOptions.series.animation = false;
    this.yearlyOverviewOptions.chart.events.load = colorPoints(this.selectedYear);
    this.yearlyOverviewOptions.chart.events.redraw = colorPoints(this.selectedYear);
    this.yearlyOverviewOptions = { ...this.yearlyOverviewOptions };
  };

  yearlyOverviewOptions: Options = {
    chart: {
      events: {
        load: colorPoints(this.selectedYear),
        redraw: colorPoints(this.selectedYear),
      },
    },
    plotOptions: {
      series: {},
      bar: {
        events: {
          click: this.yearlyOverviewClick.bind(this),
        },
      },
    },
    series: [
      {
        name: 'InvisibleClickReceiver',
        data: this.adjustedYearExpensesData.map(
          (wholeYearData, idx) => this.maxValue - (wholeYearData + this.currentTimeData[idx])
        ),
        edgeColor: 'rgb(255, 255, 255, 0)',
        opacity: 0,
      },
      {
        name: 'WholeYearExpenses',
        data: this.adjustedYearExpensesData,
      },
      {
        name: 'CurrentTimeExpsenses',
        data: this.currentTimeData,
      },
    ] as any,
  };

  constructor(private modalController: ModalController) {}
}
