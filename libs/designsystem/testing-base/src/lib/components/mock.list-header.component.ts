import { Component, forwardRef } from '@angular/core';

import { ListHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-header',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ListHeaderComponent,
      useExisting: forwardRef(() => MockListHeaderComponent),
    },
  ],
})
export class MockListHeaderComponent {}

// #endregion
