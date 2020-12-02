import { forwardRef, Component } from '@angular/core';

import { PageTitleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-page-title',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageTitleComponent,
      useExisting: forwardRef(() => MockPageTitleComponent),
    },
  ],
})
export class MockPageTitleComponent {}

// #endregion
