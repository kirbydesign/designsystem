import { Component, forwardRef, Input } from '@angular/core';

import { FormFieldComponent } from '@kirbydesign/designsystem/form-field';

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
  @Input() label: string | undefined;
  @Input() message: string | null | undefined;

  focus() {
    // NOOP
  }
}

// #endregion
