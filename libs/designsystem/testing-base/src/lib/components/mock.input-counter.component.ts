import { forwardRef, Component, Input } from '@angular/core';

import {
  InputCounterComponent,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-input-counter',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputCounterComponent,
      useExisting: forwardRef(() => MockInputCounterComponent),
    },
  ],
})
// start class MockInputCounterComponent
export class MockInputCounterComponent {
  @Input() listenTo: InputComponent | TextareaComponent;
} // end class MockInputCounterComponent

// #endregion
