import { Component, forwardRef, Input } from '@angular/core';
import { Options, XAxisBreaksOptions } from 'highcharts';

import { ChartDeprecatedComponent, ChartDeprecatedType } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-chart-deprecated',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ChartDeprecatedComponent,
      useExisting: forwardRef(() => MockChartDeprecatedComponent),
    },
  ],
})
export class MockChartDeprecatedComponent {
  @Input() data: [];
  @Input() categories: string[];
  @Input() breaks: Array<XAxisBreaksOptions>;
  @Input() height: number;
  @Input() type: ChartDeprecatedType;
  @Input() description: string;
  @Input() showDataLabels: boolean;
  @Input() options: Options;
}

// #endregion
