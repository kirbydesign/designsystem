import { Component } from '@angular/core';

import { BaseListComponent } from '../../base-list.component';

@Component({
  templateUrl: './list-custom-cell-lines-example.component.tns.html',
  styleUrls: ['./list-custom-cell-lines-example.component.tns.scss'],
})
export class ListCustomCellLinesExampleComponent extends BaseListComponent {
  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';

  // It is necessary to bind the callback method to this instance in order to
  // access the instance properties.
  onLoadMoreItemsCallback = this.onLoadMoreItems.bind(this);

  loadsCalled = 0;

  private onLoadMoreItems(): Promise<boolean> {
    const moreToLoad = this.loadsCalled < 3;

    if (moreToLoad) {
      this.loadsCalled++;
      this.myObservableItems.push([
        { title: 'new item', subTitle: '21 stk', amount: '18.309 DKK', detail: 225 },
        { title: 'new item 1', subTitle: '22 stk', amount: '18.309 DKK', detail: 225 },
        { title: 'new item 2', subTitle: '23 stk', amount: '18.309 DKK', detail: 225 },
        { title: 'new item 3', subTitle: '24 stk', amount: '18.309 DKK', detail: 225 },
      ]);
    }
    return Promise.resolve(!moreToLoad);
  }
}
