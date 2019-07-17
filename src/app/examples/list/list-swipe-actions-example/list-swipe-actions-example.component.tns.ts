import { Component, OnInit } from '@angular/core';

import { BaseListComponent } from '../base-list.component';
import { ListSwipeActionsHelper } from '../helpers/list-swipe-actions.helper';
import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/helpers/list-swipe-action';

@Component({
  templateUrl: './list-swipe-actions-example.component.tns.html',
})
export class ListSwipeActionsExampleComponent extends BaseListComponent implements OnInit {
  swipeActions: ListSwipeAction[] = [];

  ngOnInit(): void {
    this.swipeActions = ListSwipeActionsHelper.getInstance().getSwipeActions();
  }
}
