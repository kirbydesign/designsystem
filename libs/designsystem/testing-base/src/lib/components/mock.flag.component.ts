import { forwardRef, Component, Input } from '@angular/core';

import { FlagComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-flag',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FlagComponent,
      useExisting: forwardRef(() => MockFlagComponent),
    },
  ],
})
// start class MockFlagComponent
export class MockFlagComponent {
  @Input() size: 'xs' | 'sm' | 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger' | 'semi-light' | 'transparent';
} // end class MockFlagComponent

// #endregion
