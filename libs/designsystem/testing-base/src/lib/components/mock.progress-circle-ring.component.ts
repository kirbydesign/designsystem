import { Component, forwardRef, Input } from '@angular/core';

import { ProgressCircleRingComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-progress-circle-ring',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ProgressCircleRingComponent,
      useExisting: forwardRef(() => MockProgressCircleRingComponent),
    },
  ],
})
export class MockProgressCircleRingComponent {
  @Input() radius: number;
  @Input() value: number;
  @Input() themeColor: 'success' | 'warning' | 'danger';
  @Input() strokeWidth: number;
  @Input() upperBound: number;
}

// #endregion
