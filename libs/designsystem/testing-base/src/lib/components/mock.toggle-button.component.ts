import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { ToggleButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toggle-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ToggleButtonComponent,
      useExisting: forwardRef(() => MockToggleButtonComponent),
    },
  ],
})
// start class MockToggleButtonComponent
export class MockToggleButtonComponent {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();
} // end class MockToggleButtonComponent

// #endregion
