import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { SpinnerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: SpinnerComponent,
      useExisting: forwardRef(() => MockSpinnerComponent),
    },
  ],
})
export class MockSpinnerComponent {}

// #endregion
