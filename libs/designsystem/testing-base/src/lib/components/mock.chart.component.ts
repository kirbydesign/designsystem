import { Component, forwardRef, Input } from '@angular/core';

import {
  AnnotationOptions,
  ChartComponent,
  ChartDataset,
  ChartHighlightedElements,
  ChartOptions,
  ChartType,
  tooltipOptions,
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
  @Input() dataLabels: string[] | string[][];
  @Input() customOptions: ChartOptions;
  @Input() tooltipOptions: tooltipOptions;
  @Input() annotations: AnnotationOptions[];
  @Input() highlightedElements: ChartHighlightedElements;
  @Input() height: string | number;
}

// #endregion
