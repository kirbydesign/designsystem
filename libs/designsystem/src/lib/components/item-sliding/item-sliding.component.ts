import { Component, Input } from '@angular/core';

import { ItemSlidingSide, ItemSwipeAction } from './item-sliding.types';

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
    return Array.isArray(this.swipeActions) && this.swipeActions.length !== 0;
  }
}
