import { forwardRef, Component, Input } from '@angular/core';

import { GridComponent, GridCardConfiguration } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-grid',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: GridComponent,
      useExisting: forwardRef(() => MockGridComponent),
    },
  ],
})
// start class MockGridComponent
export class MockGridComponent {
  @Input() maxColumns: number;
  @Input() cardConfigurations: GridCardConfiguration[];
} // end class MockGridComponent

// #endregion
