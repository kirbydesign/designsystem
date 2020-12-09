import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { CheckboxComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
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
export class MockCheckboxComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() color: string;
  @Input() shape: string;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
