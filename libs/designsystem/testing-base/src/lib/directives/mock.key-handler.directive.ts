import { Directive, forwardRef } from '@angular/core';

import { KeyHandlerDirective } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[keyHandler]`,
  providers: [
    {
      provide: KeyHandlerDirective,
      useExisting: forwardRef(() => MockKeyHandlerDirective),
    },
  ],
})
export class MockKeyHandlerDirective {}

// #endregion
