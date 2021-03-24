import { Component } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

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
  height = 250;

  private yearExpensesData = [0, 8761, 7760];
  private currentTimeData = [0, 1000, 800];
  private maxValue = Math.max(...this.yearExpensesData) + Math.max(...this.currentTimeData);

  private years = [2018, 2019, 2020].reverse();
  public categories = this.years.map((year) => year.toString());

  private selectedYear = this.categories[0];

  private lowerLimit = Math.max(...this.yearExpensesData) * 0.01;
  // lower limit is shown as 2% of max value for UX reasons
  private adjustedYearExpensesData = this.yearExpensesData.map((data) =>
    this.lowerLimit >= data ? this.lowerLimit : data
  );

  constructor(private modalController: ModalController) {}

  private yearlyOverviewClick = (ev: MouseEvent, activeElements?: Array<{}>) => {
    const activeElement: any = activeElements[0];
    const dataSetIndex = activeElement._datasetIndex;
    const index = activeElement._index;
    this.selectedYear = this.categories[index];
    this.modalController.showAlert({
      title: 'Clicked chart',
      message: 'You clicked on year: ' + this.selectedYear,
      okBtn: 'Ok',
    });
    this.yearlyOverviewOptions = { ...this.yearlyOverviewOptions };
  };

  yearlyOverviewOptions: ChartConfiguration = {
    options: {
      events: ['click'],
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 20,
        },
      },
      animation: {
        duration: 1000,
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
        displayColors: true,
      },
      onClick: this.yearlyOverviewClick,
      scales: {
        xAxes: [
          {
            type: 'horizontalBar',
            stacked: true,
            ticks: {
              beginAtZero: false,
              sampleSize: 3,
              min: 2017,
              max: 2020,
            },
          },
        ],
        yAxes: [
          {
            type: 'category',
            position: 'left',
            display: true,
            stacked: true,
            scaleLabel: {
              display: true,
            },
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              sampleSize: 3,
              min: 2017,
              max: 2020,
            },
          },
        ],
      },
    },
    data: {
      labels: this.categories,
      datasets: this.createDataSets(),
    },
  };

  private getColors(data: number[]): string[] {
    const colors: string[] = [];
    data.forEach((d) => {
      if (d.toFixed(0) === this.selectedYear) {
        colors.push(getColor('primary').value);
      } else {
        colors.push(getColor('secondary').value);
      }
    });

    return colors;
  }

  private createDataSets(): ChartDataSets[] {
    const cds: ChartDataSets[] = [
      {
        maxBarThickness: 25,
        barThickness: 'flex',
        /*
        barPercentage: 0.5,
        categoryPercentage: 1.0,
        spanGaps: false,
        steppedLine: 'after',
*/
        type: 'horizontalBar',
        label: '',
        data: this.currentTimeData,
        borderColor: 'white',
        borderWidth: 1,
        stack: '1',
        backgroundColor: () => this.getColors(this.years),
      },
      {
        maxBarThickness: 25,
        barThickness: 'flex',
        /*
               maxBarThickness: 25,
        barPercentage: 0.5,
        categoryPercentage: 1.0,
        barThickness: 'flex',
        spanGaps: false,
        steppedLine: 'after',
*/
        type: 'horizontalBar',
        label: 'Whole Year Expenses',
        data: this.adjustedYearExpensesData,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: () => this.getColors(this.years),
        stack: '1',
      },
    ];
    return cds;
  }
}
