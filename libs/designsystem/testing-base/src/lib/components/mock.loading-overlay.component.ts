import { forwardRef, Component, Input } from '@angular/core';

import { LoadingOverlayComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-loading-overlay',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: LoadingOverlayComponent,
      useExisting: forwardRef(() => MockLoadingOverlayComponent),
    },
  ],
})
// start class MockLoadingOverlayComponent
export class MockLoadingOverlayComponent {
  @Input() isLoading: boolean;
  @Input() showBackdrop: boolean;
} // end class MockLoadingOverlayComponent

// #endregion
