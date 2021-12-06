import { Component, Input } from '@angular/core';

import { ItemSwipeAction } from '../list/list-swipe-action.type';

export type ItemSlidingSide = 'left' | 'right';

@Component({
  selector: 'kirby-item-sliding',
  templateUrl: './item-sliding.component.html',
  styleUrls: ['./item-sliding.component.scss'],
})
export class ItemSlidingComponent {
  @Input() swipeActions: ItemSwipeAction[];

  _side: 'start' | 'end' = 'start';
  @Input() set side(value: ItemSlidingSide) {
    this._side = value === 'left' ? 'start' : 'end';
  }

  get _hasSwipeActions(): boolean {
    const returnValue = Array.isArray(this.swipeActions) && this.swipeActions.length !== 0;
    return returnValue;
  }
}
