import { forwardRef, Component, Input } from '@angular/core';

import { FabSheetComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-fab-sheet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FabSheetComponent,
      useExisting: forwardRef(() => MockFabSheetComponent),
    },
  ],
})
// start class MockFabSheetComponent
export class MockFabSheetComponent {
  @Input() disabled: boolean;
  @Input() horizontalAlignment: 'left' | 'center' | 'right';
} // end class MockFabSheetComponent

// #endregion
