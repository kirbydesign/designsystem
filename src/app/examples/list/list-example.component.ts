import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseListComponent } from './base-list.component';
import { ListSwipeAction } from '../../../kirby/components/list/helpers/list-swipe-action';
import { ListSwipeActionsHelper } from './helpers/list-swipe-actions.helper';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
})
export class ListExampleComponent extends BaseListComponent implements OnInit {
  swipeActions: ListSwipeAction[] = [];

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
    this.swipeActions = ListSwipeActionsHelper.getInstance().getSwipeActions();
  }
}
