import { forwardRef, Component, Input } from '@angular/core';

import { FormFieldMessageComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-form-field-message',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FormFieldMessageComponent,
      useExisting: forwardRef(() => MockFormFieldMessageComponent),
    },
  ],
})
// start class MockFormFieldMessageComponent
export class MockFormFieldMessageComponent {
  @Input() text: string;
  @Input() position: 'left' | 'right';
} // end class MockFormFieldMessageComponent

// #endregion
