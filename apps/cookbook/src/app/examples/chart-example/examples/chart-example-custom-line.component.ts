import { AfterViewInit, Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-custom-line',
  template: `<kirby-chart 
  type="line" 
  [data]="_dataset" 
  [dataLabels]='_dataLabels' 
  [customOptions]="_customOptions"
  ></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleCustomLineComponent implements AfterViewInit {
  template: string = config.template;

  _dataset: ChartDataset[];

  _dataLabels = [
    '1950',
    '1951',
    '1952',
    '1953',
    '1954',
    '1955',
    '1956',
    '1957',
    '1958',
    '1959',
    '1960',
  ];

  _customOptions = {
    scales: {
      x: {
        ticks: {
          callback: (_, index, ticks) => {
            return index % (ticks.length - 1) === 0 ? this._dataLabels[index] : '';
          },
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      chartAreaBorder: {
        display: true,
        borderColor: 'red',
      },
    },
  };

  generateData(x: number, noDataPoints: number) {
    return new Array(noDataPoints).fill(undefined).map((_, index) => index ** x);
  }

  ngAfterViewInit() {
    this._dataset = [
      {
        data: this.generateData(3, 11),
        borderColor: 'black',
      },
      {
        data: this.generateData(3.2, 11),
        borderColor: 'green',
      },
      {
        data: this.generateData(2.5, 11),
        borderColor: 'red',
      },
    ];
  }
}
