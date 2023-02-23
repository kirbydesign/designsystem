import { Component, forwardRef, Input } from '@angular/core';

import { MockListSectionHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-section-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockListSectionHeaderComponent,
      useExisting: forwardRef(() => MockMockListSectionHeaderComponent),
    },
  ],
})
export class MockMockListSectionHeaderComponent {
  @Input() title: string;
}

// #endregion
