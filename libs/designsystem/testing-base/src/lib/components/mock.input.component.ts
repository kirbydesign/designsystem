import { forwardRef, Component, Input } from '@angular/core';

import { InputComponent } from '@kirbydesign/designsystem';

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
  selector: 'input[kirby-input]',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputComponent,
      useExisting: forwardRef(() => MockInputComponent),
    },
  ],
})
// start class MockInputComponent
export class MockInputComponent {
  @Input() type: string;
  @Input() borderless: boolean;
  @Input() hasError: boolean;
  @Input() autocomplete: 'on' | 'off';
  @Input() autocorrect: 'on' | 'off';
  @Input() value: string;
  @Input() maxlength: number;
  @Input() inputmode: string;
} // end class MockInputComponent

// #endregion
