import { Component, forwardRef } from '@angular/core';

import { ItemGroupComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-group',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ItemGroupComponent,
      useExisting: forwardRef(() => MockItemGroupComponent),
    },
  ],
})
export class MockItemGroupComponent {}

// #endregion
