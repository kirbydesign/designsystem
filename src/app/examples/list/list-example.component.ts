import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseListComponent } from './base-list.component';
import { ListSwipeAction } from './../../../kirby/components/list/list-swipe-actions/list-swipe-action';
import { ListSwipeActionsHelper } from './helpers/list-swipe-actions.helper';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
})
export class ListExampleComponent extends BaseListComponent implements OnInit {
  swipeActionsLeft: ListSwipeAction[] = [];
  swipeActionsRight: ListSwipeAction[] = [];

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    this.setUpSwipeActions();
  }

  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';

  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }

  goTo(url) {
    this.router.navigateByUrl(url);
  }

  setUpSwipeActions() {
    const swipeActions = ListSwipeActionsHelper.getInstance().getSwipeActions();
    this.swipeActionsLeft = swipeActions.left;
    this.swipeActionsRight = swipeActions.right;
  }
}
