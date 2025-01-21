import { Component, forwardRef } from '@angular/core';

import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-section-header',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: SectionHeaderComponent,
      useExisting: forwardRef(() => MockSectionHeaderComponent),
    },
  ],
})
export class MockSectionHeaderComponent {}

// #endregion
