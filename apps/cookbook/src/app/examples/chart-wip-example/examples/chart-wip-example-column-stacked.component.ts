import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { ColorHelper } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-chart-wip-example-column-stacked',
  template: `<kirby-chart type="column" [data]="_datasets" [dataLabels]="['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday']" [customOptions]="_customOptions"></kirby-chart>`,
  codeSnippet: `
  import { ColorHelper } from '@kirbydesign/designsystem';

  const { getThemeColorHexString } = ColorHelper; 

  _datasets = [
    {
      data: [0.8, 2, 3, 3.5, 0.5],
    },
    {
      data: [0.6, 2, 1, 2.1, 0.2],
      backgroundColor: getThemeColorHexString('primary'),
    },
  ];

  _customOptions: ChartOptions = {
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleColumnStackedComponent {
  template: string = config.template;

  codeSnippet = config.codeSnippet;

  _datasets = [
    {
      data: [0.8, 2, 3, 3.5, 0.5],
    },
    {
      data: [0.6, 2, 1, 2.1, 0.2],
      backgroundColor: ColorHelper.getThemeColorHexString('primary'),
    },
  ];

  _customOptions: ChartOptions = {
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };
}
