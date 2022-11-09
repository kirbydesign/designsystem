import { Component } from '@angular/core';

import { ChartDataLabelOptions, ColorHelper } from '@kirbydesign/designsystem';
const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-stock-chart 
  [data]="_dataset"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-stock-chart>
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
export class StockChartExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };

  // _dataset = [
  //   {
  //     data: [
  //       { x: 1667980178947, y: 6 },
  //       { x: 1667980208309, y: 1 },
  //     ],
  //     borderColor: getThemeColorHexString('secondary'),
  //   },

  // _dataset = [
  //   {
  //     data: [
  //       { x: 0, y: 10000000000 },
  //       { x: 2, y: 500000 },
  //       { x: 3, y: 900000 },
  //     ],
  //     borderColor: getThemeColorHexString('secondary'),
  //   },
  // ];

  _dataset = [
    {
      data: [
        { x: 1637049659000, y: 1000 },
        { x: 0, y: 1110 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
}
