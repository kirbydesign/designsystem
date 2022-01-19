import { Component } from '@angular/core';
import { ScatterDataPoint } from 'chart.js';

import { ChartDataLabelOptions, ColorHelper } from '@kirbydesign/designsystem';
const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="_dataset"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-chart>
  `,
  codeSnippet: `
  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };
  
  _dataset = [
    {
      data: [
        { x: 1637049659000, y: 127.15 },
        { x: 1637049662000, y: 127.15 },
        { x: 1637049760000, y: 127.08 },
        { x: 1637049926000, y: 127.08 },
        { x: 1637050490000, y: 126.93 },
        { x: 1637050637000, y: 127.25 },
        { x: 1637050736000, y: 127.08 },
        { x: 1637050797000, y: 127.03 },
        { x: 1637050923000, y: 127.03 },
        { x: 1637051160000, y: 127.08 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };

  _dataset = [
    {
      data: [
        { x: 1637049659000, y: 127.15 },
        { x: 1637049662000, y: 127.15 },
        { x: 1637049760000, y: 127.08 },
        { x: 1637049926000, y: 127.08 },
        { x: 1637050490000, y: 126.93 },
        { x: 1637050637000, y: 127.25 },
        { x: 1637050736000, y: 127.08 },
        { x: 1637050797000, y: 127.03 },
        { x: 1637050923000, y: 127.03 },
        { x: 1637051160000, y: 127.08 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
}
