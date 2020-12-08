import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { ToggleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-toggle',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ToggleComponent,
      useExisting: forwardRef(() => MockToggleComponent),
    },
  ],
})
// start class MockToggleComponent
export class MockToggleComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
} // end class MockToggleComponent

// #endregion
