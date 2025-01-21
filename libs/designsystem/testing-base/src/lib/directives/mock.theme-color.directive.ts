import { Directive, forwardRef, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `kirby-avatar[themeColor],
             kirby-card[themeColor],
             kirby-icon[themeColor],
             kirby-progress-circle-ring[themeColor],
             kirby-modal-footer[themeColor],
             kirby-empty-state[themeColor]`,
  providers: [
    {
      provide: ThemeColorDirective,
      useExisting: forwardRef(() => MockThemeColorDirective),
    },
  ],
})
export class MockThemeColorDirective {
  @Input() themeColor: ThemeColor;
}

// #endregion
