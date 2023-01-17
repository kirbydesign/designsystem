import { Component, forwardRef, Input } from '@angular/core';

import { ItemComponent, ItemSize } from '@kirbydesign/designsystem/item';

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
  @Input() size: ItemSize | `${ItemSize}`;
}

// #endregion
