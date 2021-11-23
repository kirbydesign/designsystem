import { Component } from '@angular/core';

import { ChartDataLabelOptions, ColorHelper } from '@kirbydesign/designsystem';

import { StockExampleData } from './chart-example-stock.data';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="singleData"
  [dataLabelOptions]="options"
  ></kirby-chart>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComponent {
  template: string = config.template;

  options: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
    locale: 'en-US',
  };

  singleData = [
    {
      label: 'single',
      data: StockExampleData.months,
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
}
