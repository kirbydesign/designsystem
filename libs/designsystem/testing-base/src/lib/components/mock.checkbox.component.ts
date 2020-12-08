import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { CheckboxComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-checkbox',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CheckboxComponent,
      useExisting: forwardRef(() => MockCheckboxComponent),
    },
  ],
})
// start class MockCheckboxComponent
export class MockCheckboxComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() color: string;
  @Input() shape: string;
  @Output() checkedChange = new EventEmitter<boolean>();
} // end class MockCheckboxComponent

// #endregion
