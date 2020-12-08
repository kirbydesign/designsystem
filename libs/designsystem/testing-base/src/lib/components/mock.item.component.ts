import { forwardRef, Component, Input } from '@angular/core';

import { ItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-item',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ItemComponent,
      useExisting: forwardRef(() => MockItemComponent),
    },
  ],
})
// start class MockItemComponent
export class MockItemComponent {
  @Input() disabled: boolean;
  @Input() selected: boolean;
  @Input() selectable: boolean;
  @Input() reorderable: boolean;
} // end class MockItemComponent

// #endregion
