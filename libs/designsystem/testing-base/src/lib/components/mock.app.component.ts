import { forwardRef, Component } from '@angular/core';

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
// start class MockAppComponent
export class MockAppComponent {} // end class MockAppComponent

// #endregion
