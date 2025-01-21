import { Directive, forwardRef, Input } from '@angular/core';

import { PortalDirective } from '@kirbydesign/designsystem/shared/portal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyPortal]',
  providers: [
    {
      provide: PortalDirective,
      useExisting: forwardRef(() => MockPortalDirective),
    },
  ],
})
export class MockPortalDirective {
  @Input() outlet: HTMLElement | undefined;
}

// #endregion
