import { forwardRef, Component, Input } from '@angular/core';

import { ModalFooterComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-modal-footer',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalFooterComponent,
      useExisting: forwardRef(() => MockModalFooterComponent),
    },
  ],
})
// start class MockModalFooterComponent
export class MockModalFooterComponent {
  @Input() snapToKeyboard: boolean;
} // end class MockModalFooterComponent

// #endregion
