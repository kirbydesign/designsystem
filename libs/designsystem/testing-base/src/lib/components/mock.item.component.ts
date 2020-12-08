import { forwardRef, Component, Input } from '@angular/core';

import { ItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
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
