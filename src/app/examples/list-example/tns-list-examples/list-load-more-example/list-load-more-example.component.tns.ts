import { Component } from '@angular/core';

import { BaseListComponent } from '../../base-list.component';

@Component({
  templateUrl: './list-load-more-example.component.tns.html',
  styleUrls: ['./list-load-more-example.component.tns.scss'],
})
export class ListLoadMoreExampleComponent extends BaseListComponent {
  // It is necessary to bind the callback method to this instance in order to
  // access the instance properties.
  onLoadMoreItemsCallback = this.onLoadMoreItems.bind(this);

  numbersCalled = 0;

  private onLoadMoreItems(): Promise<boolean> {
    const moreToLoad = this.numbersCalled < 3;

    if (moreToLoad) {
      this.numbersCalled++;
      this.addItems([
        {
          title: `Item ${this.numbersCalled}.1`,
          subTitle: '21 stk',
          amount: '12.309 DKK',
          detail: 225,
        },
        {
          title: `Item ${this.numbersCalled}.2`,
          subTitle: '22 stk',
          amount: '234 DKK',
          detail: 12,
        },
        {
          title: `Item ${this.numbersCalled}.3`,
          subTitle: '23 stk',
          amount: '32 DKK',
          detail: 1,
        },
        {
          title: `Item ${this.numbersCalled}.4`,
          subTitle: '24 stk',
          amount: '123 DKK',
          detail: -12,
        },
      ]);
    }
    return Promise.resolve(!moreToLoad);
  }
}
