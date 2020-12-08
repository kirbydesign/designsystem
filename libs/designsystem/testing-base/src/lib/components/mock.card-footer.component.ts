import { forwardRef, Component } from '@angular/core';

import { CardFooterComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-card-footer',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CardFooterComponent,
      useExisting: forwardRef(() => MockCardFooterComponent),
    },
  ],
})
// start class MockCardFooterComponent
export class MockCardFooterComponent {} // end class MockCardFooterComponent

// #endregion
