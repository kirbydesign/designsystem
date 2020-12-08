import { forwardRef, Component } from '@angular/core';

import { ListHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
