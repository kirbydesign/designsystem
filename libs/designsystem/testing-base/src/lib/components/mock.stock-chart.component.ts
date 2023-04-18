import { Component, forwardRef, Input } from '@angular/core';

import { StockChartComponent } from '@kirbydesign/designsystem';
import { ChartDataLabelOptions } from '@kirbydesign/designsystem/chart';

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
export class MockStockChartComponent {
  @Input() dataLabelOptions?: ChartDataLabelOptions;
}

// #endregion
