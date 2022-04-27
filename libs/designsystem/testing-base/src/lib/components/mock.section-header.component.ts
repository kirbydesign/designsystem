import { Component, forwardRef } from '@angular/core';

import { SectionHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-section-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SectionHeaderComponent,
      useExisting: forwardRef(() => MockSectionHeaderComponent),
    },
  ],
})
export class MockSectionHeaderComponent {}

// #endregion
