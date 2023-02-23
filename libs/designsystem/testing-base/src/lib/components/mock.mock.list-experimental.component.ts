import { Component, forwardRef } from '@angular/core';

import { MockListExperimentalComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockListExperimentalComponent,
      useExisting: forwardRef(() => MockMockListExperimentalComponent),
    },
  ],
})
export class MockMockListExperimentalComponent {}

// #endregion
