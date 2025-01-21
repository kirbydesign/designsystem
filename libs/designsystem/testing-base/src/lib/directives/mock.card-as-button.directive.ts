import { Directive, forwardRef } from '@angular/core';

import { CardAsButtonDirective } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'kirby-card[click]',
  providers: [
    {
      provide: CardAsButtonDirective,
      useExisting: forwardRef(() => MockCardAsButtonDirective),
    },
  ],
})
export class MockCardAsButtonDirective {}

// #endregion
