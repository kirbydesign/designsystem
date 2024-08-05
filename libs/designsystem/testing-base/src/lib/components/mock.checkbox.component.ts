import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { CheckboxComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-checkbox',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: CheckboxComponent,
      useExisting: forwardRef(() => MockCheckboxComponent),
    },
  ],
})
export class MockCheckboxComponent {
  @Input() checked: boolean;
  @Input() attentionLevel: '1' | '2';
  @Input() text: string;
  @Input() size?: 'xs' | 'sm' | 'md';
  @Input() hasError: boolean;
  @Input() disabled: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
}

// #endregion
