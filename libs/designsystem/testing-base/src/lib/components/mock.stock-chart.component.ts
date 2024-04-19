import { Component, forwardRef, Input } from '@angular/core';

import { StockChartComponent } from '@kirbydesign/designsystem';
import { ChartDataLabelOptions } from '@kirbydesign/designsystem/chart';

// IMPORTANT: MockStockChartComponent class needs to extend MockBaseChartComponent
// see https://github.com/kirbydesign/designsystem/issues/3029
import { MockBaseChartComponent } from './mock.base-chart.component';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-stock-chart',
  template: '<ng-content></ng-content>',
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
