import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ChartExampleAreaLine1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 250;

  changeData(month: string, data: number[]): void {
    this.dataset = {
      backgroundColor: this.dataset.backgroundColor,
      label: month,
      data: data,
      fill: 'start',
    };
  }

  datasetChange: EventEmitter<ChartDataSets> = new EventEmitter<Chart.ChartDataSets>();

  lineOptions: ChartConfiguration = {
    options: {
      animation: {
        duration: 5000,
        easing: 'easeInElastic',
      },
      maintainAspectRatio: false,
      responsive: false,
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
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
    },
  };
  dataset: ChartDataSets = {
    label: '',
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
}
