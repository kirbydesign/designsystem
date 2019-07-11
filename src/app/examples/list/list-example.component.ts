import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseListComponent } from './base-list.component';
import { ListSwipeAction } from './../../../kirby/components/list/list-swipe-actions/list-swipe-action';

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
    this.swipeActionsLeft.push({
      swipeActionFlag: 'archived',
      title: 'Archive',
      altTitle: 'Unarchive',
      iconName: 'verifiy',
      themeColor: 'warning',
      onSelected: this.onArchiveItem,
    });
    this.swipeActionsLeft.push({
      swipeActionFlag: 'flagged',
      title: 'Flag',
      iconName: 'attach',
      altIconName: 'moneybag',
      themeColor: 'success',
      onSelected: this.onFlagItem,
    });
    this.swipeActionsRight.push({
      swipeActionFlag: 'deleted',
      title: 'Delete',
      iconName: 'trash',
      themeColor: 'danger',
      onSelected: this.onDeleteItem,
    });
  }

  onArchiveItem(item: any): void {
    console.log(`onArchiveItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.archived = !item.archived;
  }

  onFlagItem(item: any): void {
    console.log(`onFlagItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.flagged = !item.flagged;
  }

  onDeleteItem(item: any): void {
    console.log(`onDeleteItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.deleted = !item.deleted;
  }
}
