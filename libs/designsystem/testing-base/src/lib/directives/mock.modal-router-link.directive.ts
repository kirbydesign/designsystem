import { Directive, forwardRef, Input } from '@angular/core';
import { Params } from '@angular/router';

import { ModalRouterLinkDirective } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `[kirbyModalRouterLink]`,
  providers: [
    {
      provide: ModalRouterLinkDirective,
      useExisting: forwardRef(() => MockModalRouterLinkDirective),
    },
  ],
})
export class MockModalRouterLinkDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyModalRouterLink') path: string | string[];
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyModalQueryParams') queryParams?: Params;
}

// #endregion
