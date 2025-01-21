import { Directive, forwardRef, Input } from '@angular/core';

import { AffixDirective } from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[kirby-affix]',
  providers: [
    {
      provide: AffixDirective,
      useExisting: forwardRef(() => MockAffixDirective),
    },
  ],
})
export class MockAffixDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirby-affix') type: 'prefix' | 'suffix';
}

// #endregion
