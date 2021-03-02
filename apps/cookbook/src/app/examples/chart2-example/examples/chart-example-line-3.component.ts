import { Component, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-line-3',
  template: `<kirby-card>
  <kirby-card-header title="Lines Datasets"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    [height]="height"
    [labels]="Labels"
    [datasets]="datasets"   
    [options]="lineOptions"   
    >
  </kirby-chart-2> 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLine3Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 450;

  lineOptions: ChartConfiguration = {
    options: {
      elements: {
        line: {
          fill: false,
        },
        point: {
          radius: 5,
          hoverRadius: 8,
          hoverBorderWidth: 1,
        },
      },
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'A Demo title',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
          },
        ],
      },
    },
  };
  labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets: ChartDataSets[] = [
    {
      label: 'My First dataset',
      backgroundColor: 'red',
      borderColor: 'red',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      fill: false,
      backgroundColor: 'lightblue',
      borderColor: 'lightblue',
      borderDash: [5, 5],
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ];
}
