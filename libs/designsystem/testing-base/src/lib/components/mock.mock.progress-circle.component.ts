import { Component, forwardRef, Input } from '@angular/core';

import { MockProgressCircleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-progress-circle',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockProgressCircleComponent,
      useExisting: forwardRef(() => MockMockProgressCircleComponent),
    },
  ],
})
export class MockMockProgressCircleComponent {
  @Input() value: number;
  @Input() size: 'sm' | 'md' | 'lg';
  @Input() themeColor: 'success' | 'warning' | 'danger';
}

// #endregion
