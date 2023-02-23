import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockToggleButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toggle-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockToggleButtonComponent,
      useExisting: forwardRef(() => MockMockToggleButtonComponent),
    },
  ],
})
export class MockMockToggleButtonComponent {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();
}

// #endregion
