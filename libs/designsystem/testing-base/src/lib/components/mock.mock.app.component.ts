import { Component, forwardRef } from '@angular/core';

import { MockAppComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-app',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockAppComponent,
      useExisting: forwardRef(() => MockMockAppComponent),
    },
  ],
})
export class MockMockAppComponent {}

// #endregion
