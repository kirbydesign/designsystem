import { Component, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-line-2',
  template: `<kirby-card>
  <kirby-card-header title="Areaspline - 2"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    label="Areaspline"
    [labels]="labels"
    [height]="height"
    [data]="data"   
    [options]="lineOptions"
    [backgroundColor]="color"
    >
  </kirby-chart-2>
  <kirby-card-footer>
      <!-- example period selector -->
      <div style="cursor: pointer">
      <span (click)="data = [200, 100, 300, 100, 200, 300, 200]">Jan </span>
      <span (click)="data = [100, 100, 100, 400, 200, 200, 200]">Feb </span>
      <span (click)="data = [500, 400, 300, 200, 100, 200, 300]">Mar </span>
    </div>
  </kirby-card-footer>
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLine2Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 450;
  color: string[] = ['red'];

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
  label: 'the label';
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

  data: number[] = [
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
  ];
}
