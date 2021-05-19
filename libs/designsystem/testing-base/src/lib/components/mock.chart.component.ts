import { Component, forwardRef, Input } from '@angular/core';
import { Options, XAxisBreaksOptions } from 'highcharts';

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
  @Input() data: any[];
  @Input() categories: string[];
  @Input() breaks: Array<XAxisBreaksOptions>;
  @Input() height: number;
  @Input() type: ChartType;
  @Input() description: string;
  @Input() showDataLabels: boolean;
  @Input() options: Options;
}

// #endregion
