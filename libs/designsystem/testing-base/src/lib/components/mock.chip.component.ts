import { forwardRef, Component, Input } from '@angular/core';

import { ChipComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-chip',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ChipComponent,
      useExisting: forwardRef(() => MockChipComponent),
    },
  ],
})
// start class MockChipComponent
export class MockChipComponent {
  @Input() text: string;
  @Input() isSelected: boolean;
} // end class MockChipComponent

// #endregion
