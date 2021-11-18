import { Component } from '@angular/core';

import { ColorHelper, datalabelOptions } from '@kirbydesign/designsystem';

import { StockExampleData } from './chart-example-stock.data';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="singleData"
  [datalabelOptions]="datalabelOptions"
  ></kirby-chart>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComponent {
  template: string = config.template;

  datalabelOptions: datalabelOptions = {
    showMin: true,
    showMax: false,
    locale: 'en-US',
    valueSuffix: '%',
  };

  singleData = [
    {
      label: 'single',
      data: StockExampleData.months,
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
}
