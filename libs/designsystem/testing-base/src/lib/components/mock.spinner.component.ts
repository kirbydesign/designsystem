import { forwardRef, Component } from '@angular/core';

import { SpinnerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
