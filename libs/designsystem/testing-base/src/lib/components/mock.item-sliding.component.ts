import { Component, forwardRef, Input } from '@angular/core';

import { ItemSlidingComponent, ItemSlidingSide, ItemSwipeAction } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-sliding',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ItemSlidingComponent,
      useExisting: forwardRef(() => MockItemSlidingComponent),
    },
  ],
})
export class MockItemSlidingComponent {
  @Input() swipeActions: ItemSwipeAction[];
  @Input() side: ItemSlidingSide;
}

// #endregion
