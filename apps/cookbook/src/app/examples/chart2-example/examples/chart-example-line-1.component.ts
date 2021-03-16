import { Component, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-line-1',
  template: `<kirby-card>
  <kirby-card-header title="Line"></kirby-card-header>
  <kirby-chart-2 
    #chart
    type="line"
    label="Line 1"
    [labels]="labels"
    [height]="height"
    [dataset]="dataset"     
    >
  </kirby-chart-2>
  <kirby-card-footer>
      <!-- example period selector -->
      <div style="cursor: pointer">
      <button kirby-button (click)="changeData('January',this.dataJanuary)">January </button>
      <button kirby-button (click)="changeData('February',this.dataFebruary)">February </button>
      <button kirby-button (click)="changeData('Marts',this.dataMarts)">Marts </button>
    </div>
  </kirby-card-footer>
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLine1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 250;
  datasetChange: EventEmitter<ChartDataSets> = new EventEmitter<Chart.ChartDataSets>();
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
  defaultData: number[] = [
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
  dataset: ChartDataSets = {
    label: 'the label',
    backgroundColor: ['rgba(255, 35, 35, 0.2)'],
    data: this.defaultData,
  };

  dataJanuary: number[] = [
    1600.9,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
    1950.6,
    1700.4,
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
  ];
  dataFebruary: number[] = [
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1950.6,
    1700.4,
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
  ];
  dataMarts: number[] = [
    1710.5,
    1060.4,
    1290.2,
    1600.9,
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
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
  ];
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

  changeData(month: string, data: number[]): void {
    this.dataset = {
      backgroundColor: this.dataset.backgroundColor,
      label: month,
      data: data,
    };
  }
}
