import { Component, forwardRef, Input } from '@angular/core';

import { PageFooterComponent } from '@kirbydesign/designsystem/page';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-page-footer',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: PageFooterComponent,
      useExisting: forwardRef(() => MockPageFooterComponent),
    },
  ],
})
export class MockPageFooterComponent {
  @Input() hasPadding: boolean;
}

// #endregion
