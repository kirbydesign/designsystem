import { forwardRef, Component, Input } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-icon',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: IconComponent,
      useExisting: forwardRef(() => MockIconComponent),
    },
  ],
})
// start class MockIconComponent
export class MockIconComponent {
  @Input() name: string;
  @Input() customName: string;
} // end class MockIconComponent

// #endregion
