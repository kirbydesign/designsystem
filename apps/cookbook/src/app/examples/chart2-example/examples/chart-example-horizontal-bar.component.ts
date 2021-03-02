import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import moment from 'moment';

const config = {
  selector: 'cookbook-chart-example-horizontal-bar',
  template: `<kirby-card>
  <kirby-card-header title="Horizontal bars"></kirby-card-header>
   <kirby-chart-2
      [options]="yearlyOverviewOptions"
      [height]="height"
      type="horizontalBar"
      label="Horizontal bars"
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
  height = 450;

  private years = [2015, 2016, 2017, 2018, 2019, 2020].reverse();
  categories = this.years.map((year) => year.toString());

  yearlyOverviewOptions: ChartConfiguration = {
    options: {
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        },
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
      scales: {
        xAxes: [
          {
            type: 'horizontalBar',
            offset: true,
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Bitcoins',
            },
            display: false,
          },
        ],
      },
    },
    data: {
      labels: this.categories,
      datasets: [
        {
          label: 'BitCoins in Vallet',
          data: [12, 19, 3, 5, 20, 30],
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    },
  };
}
