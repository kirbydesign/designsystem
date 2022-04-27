import { Component, forwardRef, Input } from '@angular/core';

import { ListExperimentalComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListExperimentalComponent,
      useExisting: forwardRef(() => MockListExperimentalComponent),
    },
  ],
})
export class MockListExperimentalComponent {}

// #endregion
