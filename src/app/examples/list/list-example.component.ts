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

  onItemOptionSelect(event) {
    // Example of updating title and icon for selected option
    if (event.option.id === 0) {
      event.option.title = event.option.selected ? 'Restore' : 'Archive';
      event.option.iconName = event.option.selected ? 'unsubscribe' : 'verifiy';
    }
    console.log('list option item selected :', event);
  }
}
