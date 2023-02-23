import { Component, forwardRef, Input } from '@angular/core';

import { MockItemSlidingComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-sliding',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockItemSlidingComponent,
      useExisting: forwardRef(() => MockMockItemSlidingComponent),
    },
  ],
})
export class MockMockItemSlidingComponent {
  @Input() swipeActions: ItemSwipeAction[];
  @Input() side: ItemSlidingSide;
}

// #endregion
