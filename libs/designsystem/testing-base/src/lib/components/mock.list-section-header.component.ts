import { forwardRef, Component, Input } from '@angular/core';

import { ListSectionHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-section-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListSectionHeaderComponent,
      useExisting: forwardRef(() => MockListSectionHeaderComponent),
    },
  ],
})
// start class MockListSectionHeaderComponent
export class MockListSectionHeaderComponent {
  @Input() title: string;
} // end class MockListSectionHeaderComponent

// #endregion
