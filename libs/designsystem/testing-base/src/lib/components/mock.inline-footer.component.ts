import { forwardRef, Component, Input } from '@angular/core';

import { InlineFooterComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-inline-footer',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InlineFooterComponent,
      useExisting: forwardRef(() => MockInlineFooterComponent),
    },
  ],
})
export class MockInlineFooterComponent {}

// #endregion
