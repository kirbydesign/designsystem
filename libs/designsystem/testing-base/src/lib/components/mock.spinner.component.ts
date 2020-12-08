import { forwardRef, Component } from '@angular/core';

import { SpinnerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SpinnerComponent,
      useExisting: forwardRef(() => MockSpinnerComponent),
    },
  ],
})
// start class MockSpinnerComponent
export class MockSpinnerComponent {} // end class MockSpinnerComponent

// #endregion
