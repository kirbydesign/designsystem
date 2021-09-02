import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-custom-line',
  template: `<kirby-chart 
  type="line" 
  [data]="[6, 6.37, 6.46, 6.64, 6.78, 7.44, 7.92, 8.18, 8.41, 8.85, 9.33]" 
  [dataLabels]='_dataLabels' 
  [customOptions]="_customOptions"
  ></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleCustomLineComponent {
  template: string = config.template;

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

  _customOptions: ChartOptions = {
    scales: {
      x: {
        ticks: {
          callback: (_, index, ticks) => {
            return index % (ticks.length - 1) === 0 ? this._dataLabels[index] : '';
          },
        },
      },
    },
  };
}
