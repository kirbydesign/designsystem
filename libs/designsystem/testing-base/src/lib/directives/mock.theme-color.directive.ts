import { Directive, forwardRef, Input } from '@angular/core';

import { ThemeColor, ThemeColorDirective } from '@kirbydesign/designsystem';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `kirby-card[themeColor],
             kirby-icon[themeColor],
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
