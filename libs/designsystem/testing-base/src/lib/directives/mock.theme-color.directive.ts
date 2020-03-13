import { Input, Directive, forwardRef } from '@angular/core';

import { ThemeColor, ThemeColorDirective } from '@kirbydesign/designsystem';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `kirby-card[themeColor],
             kirby-badge[themeColor],
             kirby-icon[themeColor],
             kirby-toolbar[themeColor]
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
