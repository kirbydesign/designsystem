import { ReturnStatement } from '@angular/compiler';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { SeriesClickCallbackFunction, SeriesClickEventObject } from 'highcharts';
import moment from 'moment';

import { DesignTokenHelper, ModalController } from '@kirbydesign/designsystem';

const getColor = DesignTokenHelper.getColor;

const config = {
  selector: 'cookbook-chart-example-horizontal-bar',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>
   <kirby-chart-2
      [options]="yearlyOverviewOptions"
      [height]="height"
      type="horizontalBar"
      label="Bar"
    >
    </kirby-chart-2>
  
</kirby-card>`,
  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleHorizontalBarComponent {
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
    /*
    this.yearlyOverviewOptions.plotOptions.series.animation = false;
    this.yearlyOverviewOptions.chart.events.load = colorPoints(this.selectedYear);
    this.yearlyOverviewOptions.chart.events.redraw = colorPoints(this.selectedYear);
    */
    this.yearlyOverviewOptions = { ...this.yearlyOverviewOptions };
  };

  getColors(data: number[]): string[] {
    const colors: string[] = [];
    data.forEach((d) => {
      console.log('selected year', d, this.selectedYear);
      if (d.toFixed(0) === this.selectedYear) {
        colors.push(getColor('primary').value);
      } else {
        // colors.push(getColor('background-color').value);
        colors.push('red');
      }
    });

    return colors;
  }

  yearlyOverviewOptions: ChartConfiguration = {
    options: {
      animation: {
        duration: 1000,
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            type: 'horizontalBar',
            stacked: true,
            offset: true,
          },
        ],
        yAxes: [
          {
            type: 'horizontalBar',
            stacked: true,
            //            display: true,
          },
        ],
      },
    },
    data: {
      labels: this.categories,
      datasets: [
        {
          label: 'InvisibleClickReceiver',
          data: this.adjustedYearExpensesData.map(
            (wholeYearData, idx) => this.maxValue - (wholeYearData + this.currentTimeData[idx])
          ),
          borderColor: 'rgb(255, 255, 255, 0)',
        },
        {
          label: 'WholeYearExpenses',
          data: this.adjustedYearExpensesData,
          borderColor: 'rgb(255, 255, 255, 0)',
          borderWidth: 1,
          backgroundColor: this.getColors(this.years),
        },
        {
          label: 'CurrentTimeExpenses',
          data: this.currentTimeData,
        },
      ],
    },
  };

  constructor(private modalController: ModalController) {}
}
