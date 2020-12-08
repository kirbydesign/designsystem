import { forwardRef, Component, Input } from '@angular/core';

import { BadgeComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: BadgeComponent,
      useExisting: forwardRef(() => MockBadgeComponent),
    },
  ],
})
// start class MockBadgeComponent
export class MockBadgeComponent {
  @Input() text: string;
} // end class MockBadgeComponent

// #endregion
