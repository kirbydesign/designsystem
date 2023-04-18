import { Directive, forwardRef, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers';
import { ListItemColorDirective } from '@kirbydesign/designsystem/list';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyListItemColor]',
  providers: [
    {
      provide: ListItemColorDirective,
      useExisting: forwardRef(() => MockListItemColorDirective),
    },
  ],
})
export class MockListItemColorDirective {
  @Input() kirbyListItemColor: (item: any) => ThemeColor;
  @Input() item: any;
}

// #endregion
