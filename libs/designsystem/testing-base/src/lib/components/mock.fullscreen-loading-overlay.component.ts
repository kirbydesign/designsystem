import { forwardRef, Component, Input } from '@angular/core';

import { FullscreenLoadingOverlayComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FullscreenLoadingOverlayComponent,
      useExisting: forwardRef(() => MockFullscreenLoadingOverlayComponent),
    },
  ],
})
// start class MockFullscreenLoadingOverlayComponent
export class MockFullscreenLoadingOverlayComponent {
  @Input() showBackdrop: boolean;
} // end class MockFullscreenLoadingOverlayComponent

// #endregion
