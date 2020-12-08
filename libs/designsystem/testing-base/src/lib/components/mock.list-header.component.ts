import { forwardRef, Component } from '@angular/core';

import { ListHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListHeaderComponent,
      useExisting: forwardRef(() => MockListHeaderComponent),
    },
  ],
})
// start class MockListHeaderComponent
export class MockListHeaderComponent {} // end class MockListHeaderComponent

// #endregion
