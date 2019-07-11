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
  @Input() swipeActionsStart: ListSwipeAction[];
  @Input() swipeActionsEnd: ListSwipeAction[];

  constructor(private listHelper: ListHelper) {}

  onActionSwipeLtR() {
    this.selectSwipeAction(this.swipeActionsStart[0].onSelected);
  }

  onActionSwipeRtL() {
    this.selectSwipeAction(this.swipeActionsEnd[this.swipeActionsEnd.length - 1].onSelected);
  }

  selectSwipeAction(action: Function) {
    this.listHelper.closeActionItems();
    action(this.item);
  }
}
