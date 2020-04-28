import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { ToggleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
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
export class MockToggleComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
