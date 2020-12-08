import { forwardRef, Component, Input } from '@angular/core';

import { DividerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-divider',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: DividerComponent,
      useExisting: forwardRef(() => MockDividerComponent),
    },
  ],
})
// start class MockDividerComponent
export class MockDividerComponent {
  @Input() hasMargin: boolean;
} // end class MockDividerComponent

// #endregion
