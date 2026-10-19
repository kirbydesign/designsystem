import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-section-header',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
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
