import { Component, forwardRef, Input } from '@angular/core';

import {
  AnnotationOptions,
  ChartComponent,
  ChartDataLabelOptions,
  ChartDataset,
  ChartHighlightedElements,
  ChartOptions,
  ChartType,
} from '@kirbydesign/designsystem';

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
  @Input() type: ChartType;
  @Input() data: ChartDataset[] | number[];
  @Input() labels: string[] | string[][];
  @Input() customOptions: ChartOptions;
  @Input() dataLabelOptions: ChartDataLabelOptions;
  @Input() annotations: AnnotationOptions[];
  @Input() highlightedElements: ChartHighlightedElements;
  @Input() height: string | number;
}

// #endregion
