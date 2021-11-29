import { Component, forwardRef } from '@angular/core';

import { ItemSlidingComponent } from '@kirbydesign/designsystem';

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
  @Input() swipeActions: ListSwipeAction[];
}

// #endregion
