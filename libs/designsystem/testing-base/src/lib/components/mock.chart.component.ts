import { Component, forwardRef, Input } from '@angular/core';

import { ChartComponent, ChartType } from '@kirbydesign/designsystem';

// IMPORTANT: MockChartComponent class needs to extend MockBaseChartComponent
// see https://github.com/kirbydesign/designsystem/issues/3029
import { MockBaseChartComponent } from './mock.base-chart.component';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-chart',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ChartComponent,
      useExisting: forwardRef(() => MockChartComponent),
    },
  ],
})
export class MockChartComponent extends MockBaseChartComponent {
  @Input() type: Exclude<ChartType, 'stock'>;
}

// #endregion
