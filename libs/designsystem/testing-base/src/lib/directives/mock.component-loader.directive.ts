import { Directive, forwardRef, Input } from '@angular/core';

import { ComponentConfiguration, ComponentLoaderDirective } from '@kirbydesign/designsystem/shared';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyLoadComponent]',
  providers: [
    {
      provide: ComponentLoaderDirective,
      useExisting: forwardRef(() => MockComponentLoaderDirective),
    },
  ],
})
export class MockComponentLoaderDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyLoadComponent') configuration: ComponentConfiguration;
  @Input() cssClass: string;
}

// #endregion
