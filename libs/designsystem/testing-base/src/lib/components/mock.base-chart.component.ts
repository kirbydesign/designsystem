import { Component, forwardRef, Input } from '@angular/core';

import {
  AnnotationOptions,
  BaseChartComponent,
  ChartDataset,
  ChartHighlightedElements,
  ChartLabel,
  ChartOptions,
  ChartType,
} from '@kirbydesign/designsystem/chart';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-base-chart',
  template: '<ng-content></ng-content>',
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
  @Input() customOptions: ChartOptions;
  @Input() annotations: AnnotationOptions[];
  @Input() highlightedElements: ChartHighlightedElements;
  @Input() height: string | number;
}

// #endregion
