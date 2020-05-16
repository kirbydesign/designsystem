import { Component } from '@angular/core';
import { Options, SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';

import { ModalController, DesignTokenHelper } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;
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
  selector: 'cookbook-chart-example-column',
  template: `<kirby-card>
  <kirby-card-header title="Column"></kirby-card-header>
  <kirby-chart [height]="height" [categories]="categories" type="column" [data]="adjustedMonthlyExpenseData" [options]="monthlyOverviewOptions"> </kirby-chart>
  </kirby-card>`,
  codeSnippet: `private monthlyOverviewClick: SeriesClickCallbackFunction = (ev: SeriesClickEventObject) => {
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
    chart: { events: {} },
    plotOptions: {
      series: {},
      column: {
        events: {
          click: this.monthlyOverviewClick.bind(this),
        },
      },
    },
    yAxis: {
      plotLines: [
        {
          width: 1,
          color: getColor('semi-dark').value,
          dashStyle: 'Dash',
          value: 872,
        },
      ],
    },
  };`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleColumnComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 150;

  categories = ['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb'];
  private monthlyExpenseData = [0, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600];
  private selectedIdx = 0;

  // lower limit is shown as 2% of max value for UX reasons
  private lowerLimit = Math.max(...this.monthlyExpenseData) * 0.02;
  adjustedMonthlyExpenseData = this.monthlyExpenseData.map((data) =>
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
    chart: { events: {} },
    plotOptions: {
      series: {},
      column: {
        events: {
          click: this.monthlyOverviewClick.bind(this),
        },
      },
    },
    yAxis: {
      plotLines: [
        {
          width: 1,
          color: getColor('semi-dark').value,
          dashStyle: 'Dash',
          value: 872,
        },
      ],
    },
  };

  constructor(private modalController: ModalController) {}
}
