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
export class MockItemComponent {
  @Input() disabled: boolean;
  @Input() selected: boolean;
  @Input() selectable: boolean;
  @Input() reorderable: boolean;
}

// #endregion
