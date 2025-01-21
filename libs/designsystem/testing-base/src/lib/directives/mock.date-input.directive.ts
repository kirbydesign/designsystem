import { Directive, forwardRef } from '@angular/core';

import { DateInputDirective } from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[kirby-input][type="date"]',
  providers: [
    {
      provide: DateInputDirective,
      useExisting: forwardRef(() => MockDateInputDirective),
    },
  ],
})
export class MockDateInputDirective {}

// #endregion
