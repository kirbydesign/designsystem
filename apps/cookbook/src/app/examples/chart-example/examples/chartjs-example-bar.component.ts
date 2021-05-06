import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

const config = {
  selector: `cookbook-chartjs-example-bar`,
  template: `<kirby-card>
    <kirby-card-header title="ChartJs Bar"></kirby-card-header>
    <kirby-chartjs [data]="data" [chartType]="chartType" [chartOptions]="chartOptions"></kirby-chartjs>
</kirby-card>`,
  codeSnippet: `chartType: ChartType = 'bar';
    data = {
        labels: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartJsExampleBarComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

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

  chartType: ChartType = 'bar';
  data: ChartData = {
    labels: ['2020', '2019', '2018'],
    datasets: [
      {
        label: 'InvisibleClickReceiver',
        data: this.adjustedYearExpensesData.map(
          (wholeYearData, idx) => this.maxValue - (wholeYearData + this.currentTimeData[idx])
        ),
      },
      {
        label: 'WholeYearExpenses',
        data: this.adjustedYearExpensesData,
      },
      {
        label: 'CurrentTimeExpsenses',
        data: this.currentTimeData,
      },
    ],
  };

  chartOptions: ChartOptions = {
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
}
