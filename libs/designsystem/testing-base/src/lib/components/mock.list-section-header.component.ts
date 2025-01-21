import { Component, forwardRef, Input } from '@angular/core';

import { ListSectionHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-section-header',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ListSectionHeaderComponent,
      useExisting: forwardRef(() => MockListSectionHeaderComponent),
    },
  ],
})
export class MockListSectionHeaderComponent {
  @Input() title: string;
}

// #endregion
