import { Component, forwardRef, Input } from '@angular/core';

import {
  BaseChartComponent,
  ChartDataset,
  ChartHighlightedElements,
  ChartLabel,
  ChartType,
} from '@kirbydesign/designsystem/chart';
import { ChartOptions } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-base-chart',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: BaseChartComponent,
      useExisting: forwardRef(() => MockBaseChartComponent),
    },
  ],
})
export class MockBaseChartComponent {
  @Input() type: ChartType;
  @Input() data: ChartDataset[] | number[];
  @Input() labels: ChartLabel[];
  @Input() customOptions?: ChartOptions;
  @Input() annotations?: AnnotationOptions[];
  @Input() highlightedElements?: ChartHighlightedElements;
  @Input() height: string | number;
}

// #endregion
