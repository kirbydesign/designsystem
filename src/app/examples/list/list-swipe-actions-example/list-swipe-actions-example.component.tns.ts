import { Component, OnInit } from '@angular/core';

import { BaseListComponent } from '../base-list.component';
import { ListSwipeActionsHelper } from '../helpers/list-swipe-actions.helper';
import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/list-swipe-actions/list-swipe-action';

@Component({
  templateUrl: './list-swipe-actions-example.component.tns.html',
})
export class ListSwipeActionsExampleComponent extends BaseListComponent implements OnInit {
  swipeActionsLeft: ListSwipeAction[] = [];
  swipeActionsRight: ListSwipeAction[] = [];

  ngOnInit(): void {
    this.setUpSwipeActions();
  }

  setUpSwipeActions() {
    const swipeActions = ListSwipeActionsHelper.getInstance().getSwipeActions();
    this.swipeActionsLeft = swipeActions.left;
    this.swipeActionsRight = swipeActions.right;
  }
}
