import { forwardRef, Component, Input } from '@angular/core';

import { ProgressCircleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-progress-circle',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ProgressCircleComponent,
      useExisting: forwardRef(() => MockProgressCircleComponent),
    },
  ],
})
// start class MockProgressCircleComponent
export class MockProgressCircleComponent {
  @Input() value: number;
  @Input() size: 'sm' | 'md' | 'lg';
  @Input() themeColor: 'success' | 'warning' | 'danger';
} // end class MockProgressCircleComponent

// #endregion
