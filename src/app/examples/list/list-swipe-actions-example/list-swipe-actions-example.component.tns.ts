import { Component, OnInit } from '@angular/core';

import { BaseListComponent } from '../base-list.component';
import { ListSwipeActionsHelper } from '../helpers/list-swipe-actions.helper';
import { ListSwipeAction } from '@kirbydesign/designsystem/components/list/list-swipe-action';

@Component({
  templateUrl: './list-swipe-actions-example.component.tns.html',
})
export class ListSwipeActionsExampleComponent extends BaseListComponent implements OnInit {
  swipeActions: ListSwipeAction[] = [];

  ngOnInit(): void {
    this.swipeActions = ListSwipeActionsHelper.getInstance().getSwipeActions();
  }

  getSectionName(item: any): string {
    if (item.id < 5) return '1st section';
    if (item.id < 10) return '2nd section';
    if (item.id < 15) return '3rd section';
    if (item.id < 30) return '4th section';
    if (item.id < 60) return '5th section';
    return 'Large section';
  }
}
