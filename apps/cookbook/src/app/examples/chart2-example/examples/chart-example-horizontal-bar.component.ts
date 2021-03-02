import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-horizontal-bar',
  template: `<kirby-card>
  <kirby-card-header title="Horizontal bars"></kirby-card-header>

   <kirby-chart-2
      [options]="yearlyOverviewOptions"
      type="horizontalBar"
      label="Horizontal bars"
      [categories]="categories"      
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

  yearlyOverviewOptions: ChartConfiguration = {
    options: {
      maintainAspectRatio: false,
    },
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Bar Sample',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
        },
      ],
    },
  };
}
