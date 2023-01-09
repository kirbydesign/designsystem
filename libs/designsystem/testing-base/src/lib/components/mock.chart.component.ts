import { Component, forwardRef, Input } from '@angular/core';

import { ChartComponent, ChartType } from '@kirbydesign/designsystem';

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
export class MockChartComponent {
  @Input() type: Exclude<ChartType, 'stock'>;
}

// #endregion
