import { Component } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem';

import { StockExampleData } from './chart-example-stock.data';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock-comparison',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="compareData"
  [datalabelOptions]="datalabelOptions"
  ></kirby-chart>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComparisonComponent {
  template: string = config.template;

  datalabelOptions = {
    showMin: false,
    showMax: false,
    showCurrent: false,
    locale: 'da-DK',
  };

  compareData = [
    {
      label: 'stock1',
      data: StockExampleData.stock1,
      borderColor: getThemeColorHexString('secondary'),
    },
    {
      label: 'stock2',
      data: StockExampleData.stock2,
      borderColor: getThemeColorHexString('primary'),
    },
    {
      label: 'stock3',
      data: StockExampleData.stock3,
      borderColor: getThemeColorHexString('semi-dark'),
    },
  ];
}
