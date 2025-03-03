import { Component, forwardRef, Input } from '@angular/core';

import { FormFieldComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-form-field',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: FormFieldComponent,
      useExisting: forwardRef(() => MockFormFieldComponent),
    },
  ],
})
export class MockFormFieldComponent {
  @Input() label: string;
  @Input() message: string;

  focus() {
    // NOOP
  }
}

// #endregion
