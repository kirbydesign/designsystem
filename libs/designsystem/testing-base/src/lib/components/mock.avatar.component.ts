import { forwardRef, Component, Input } from '@angular/core';

import { AvatarComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-avatar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AvatarComponent,
      useExisting: forwardRef(() => MockAvatarComponent),
    },
  ],
})
// start class MockAvatarComponent
export class MockAvatarComponent {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
} // end class MockAvatarComponent

// #endregion
