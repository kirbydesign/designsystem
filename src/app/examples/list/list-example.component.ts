import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseListComponent } from './base-list.component';

@Component({
  selector: 'kirby-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
})
export class ListExampleComponent extends BaseListComponent {
  constructor(private router: Router) {
    super();
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

  onArchiveItem(item: any) {
    console.log(`onArchiveItem called on item with id: ${item.id}...`);
    this.delayAction(() => {
      item.archived = !(item.archived || false);
    });
  }

  onFlagItem(item: any) {
    console.log(`onFlagItem called on item with id: ${item.id}...`);
    this.delayAction(() => {
      item.flagged = !(item.flagged || false);
    });
  }

  onDeleteItem(item: any) {
    console.log(`onDeleteItem called on item with id: ${item.id}...`);
    this.delayAction(() => {
      item.deleted = !(item.deleted || false);
    });
  }

  delayAction(action: () => void) {
    // supposing that there should be a call to the back-end here that takes 1 sec...
    setTimeout(() => {
      action();
    }, 1000);
  }
}
