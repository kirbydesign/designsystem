import { Component, forwardRef } from '@angular/core';

import { AppComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-app',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AppComponent,
      useExisting: forwardRef(() => MockAppComponent),
    },
  ],
})
export class MockAppComponent {}

// #endregion
