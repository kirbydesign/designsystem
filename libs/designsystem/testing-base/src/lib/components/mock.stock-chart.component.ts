import { Component, forwardRef, Input } from '@angular/core';

import { ChartDataLabelOptions, StockChartComponent } from '@kirbydesign/designsystem/chart';

import { MockBaseChartComponent } from './mock.base-chart.component';

// IMPORTANT: MockStockChartComponent class needs to extend MockBaseChartComponent
// see https://github.com/kirbydesign/designsystem/issues/3029

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-stock-chart',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: StockChartComponent,
      useExisting: forwardRef(() => MockStockChartComponent),
    },
  ],
})
export class MockStockChartComponent extends MockBaseChartComponent {
  @Input() dataLabelOptions?: ChartDataLabelOptions;
}

// #endregion
