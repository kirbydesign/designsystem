import { Component, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-areaspline-1',
  template: `<kirby-card>
  <kirby-card-header title="Areaspline"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    label="Areaspline"
    [labels]="labels"
    [height]="height"
    [dataset]="dataset"   
    >
  </kirby-chart-2> 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleAreaLine1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 250;

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
    },
  };
  dataset: ChartDataSets = {
    label: 'the label',
    backgroundColor: 'lightgreen',
    fill: 'start',
    data: [
      1600.9,
      1710.5,
      1060.4,
      1290.2,
      1440.0,
      1460.0,
      1350.6,
      1480.5,
      1800.4,
      1940.1,
      1950.6,
      1700.4,
      1600.9,
      1710.5,
      1060.4,
      1290.2,
      1440.0,
      1460.0,
      1350.6,
      1480.5,
      1800.4,
      1940.1,
      1950.6,
      1700.4,
    ],
  };

  labels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
}
