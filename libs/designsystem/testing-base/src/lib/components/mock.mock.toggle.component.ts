import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockToggleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toggle',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockToggleComponent,
      useExisting: forwardRef(() => MockMockToggleComponent),
    },
  ],
})
export class MockMockToggleComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
