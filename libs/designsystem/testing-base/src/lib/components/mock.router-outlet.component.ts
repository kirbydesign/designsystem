import { forwardRef, Component, Input } from '@angular/core';

import { RouterOutletComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-router-outlet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RouterOutletComponent,
      useExisting: forwardRef(() => MockRouterOutletComponent),
    },
  ],
})
// start class MockRouterOutletComponent
export class MockRouterOutletComponent {
  @Input() main: boolean;
} // end class MockRouterOutletComponent

// #endregion
