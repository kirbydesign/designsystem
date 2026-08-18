import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-section-header',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: SectionHeaderComponent,
      useExisting: forwardRef(() => MockSectionHeaderComponent),
    },
  ],
})
export class MockSectionHeaderComponent {}

// #endregion
