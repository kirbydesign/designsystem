import { forwardRef, Component, Input } from '@angular/core';

import { ButtonComponent, NotificationColor } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ButtonComponent,
      useExisting: forwardRef(() => MockButtonComponent),
    },
  ],
})
// start class MockButtonComponent
export class MockButtonComponent {
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() isDestructive: boolean;
  @Input() themeColor: NotificationColor;
  @Input() expand: 'full' | 'block';
  @Input() text: string;
  @Input() isFloating: boolean;
} // end class MockButtonComponent

// #endregion
