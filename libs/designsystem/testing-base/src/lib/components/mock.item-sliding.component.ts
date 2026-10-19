import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import {
  ItemSlidingComponent,
  ItemSlidingSide,
  ItemSwipeAction,
} from '@kirbydesign/designsystem/item-sliding';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-sliding',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
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
