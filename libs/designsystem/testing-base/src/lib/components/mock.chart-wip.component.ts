import { Component, forwardRef, Input } from '@angular/core';

import {
  ChartWipAnnotationOptions as AnnotationOptions,
  ChartWipComponent,
  ChartWipData as ChartData,
  ChartWipHighlightedElements as ChartHighlightedElements,
  ChartWipOptions as ChartOptions,
  ChartWipType as ChartType,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-chart-wip',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ChartWipComponent,
      useExisting: forwardRef(() => MockChartWipComponent),
    },
  ],
})
export class MockChartWipComponent {
  @Input() type: ChartType;
  @Input() data: ChartData;
  @Input() dataLabels: string[] | string[][];
  @Input() customOptions: ChartOptions;
  @Input() annotations: AnnotationOptions[];
  @Input() highlightedElements: ChartHighlightedElements;
  @Input() height: string | number;
}

// #endregion
