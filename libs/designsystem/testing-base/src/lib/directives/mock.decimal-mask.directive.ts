import { Directive, forwardRef, Input } from '@angular/core';

import { DecimalMaskDirective } from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[kirby-decimal-mask]',
  providers: [
    {
      provide: DecimalMaskDirective,
      useExisting: forwardRef(() => MockDecimalMaskDirective),
    },
  ],
})
export class MockDecimalMaskDirective {
  @Input() min: number;
  @Input() max: number;
  @Input() precision: number;
  @Input() setMaxOnOverflow: boolean;
  @Input() allowMinus: boolean;
  @Input() disableGroupSeperator: string;
  @Input() maxlength: number;
}

// #endregion
