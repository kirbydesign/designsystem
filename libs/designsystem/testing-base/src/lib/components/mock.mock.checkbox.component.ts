import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockCheckboxComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-checkbox',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockCheckboxComponent,
      useExisting: forwardRef(() => MockMockCheckboxComponent),
    },
  ],
})
export class MockMockCheckboxComponent {
  @Input() checked: boolean;
  @Input() attentionLevel: '1' | '2';
  @Input() text: string;
  @Input() size: 'xs' | 'sm' | 'md';
  @Input() hasError: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
