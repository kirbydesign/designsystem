import { Component, forwardRef } from '@angular/core';

import { MockItemGroupComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-group',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockItemGroupComponent,
      useExisting: forwardRef(() => MockMockItemGroupComponent),
    },
  ],
})
export class MockMockItemGroupComponent {}

// #endregion
