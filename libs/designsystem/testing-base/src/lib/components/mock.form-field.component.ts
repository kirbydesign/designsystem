import { forwardRef, Component, Input } from '@angular/core';

import { FormFieldComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-form-field',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FormFieldComponent,
      useExisting: forwardRef(() => MockFormFieldComponent),
    },
  ],
})
// start class MockFormFieldComponent
export class MockFormFieldComponent {
  @Input() label: string;
  @Input() message: string;

  // #region CUSTOM
  focus() {}
  // #endregion
} // end class MockFormFieldComponent

// #endregion
