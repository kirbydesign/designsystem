import { Component, Input } from '@angular/core';

import { ListHelper } from '../helpers/list-helper';
import { ListSwipeAction } from './list-swipe-action';

@Component({
  selector: 'kirby-list-swipe-actions',
  templateUrl: './list-swipe-actions.component.html',
  styleUrls: ['./list-swipe-actions.component.scss'],
})
export class ListSwipeActionsComponent {
  @Input() item: any;
  @Input() swipeActionsLeft: ListSwipeAction[];
  @Input() swipeActionsRight: ListSwipeAction[];

  constructor(private listHelper: ListHelper) {}

  onActionSwipeLtR() {
    this.onSwipeActionSelect(this.swipeActionsLeft[0].onSelected);
  }

  onActionSwipeRtL() {
    this.onSwipeActionSelect(this.swipeActionsRight[this.swipeActionsRight.length - 1].onSelected);
  }

  onSwipeActionSelect(action: (item: any) => void) {
    this.listHelper.closeActionItems();
    action(this.item);
  }
}
