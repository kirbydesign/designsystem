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

      for (let i = 0; i < 10; i++) {
        this.addItems([
          {
            title: `Item ${this.numbersCalled}.${i}`,
            subTitle: `${Math.round(Math.random() * 100)} stk`,
            amount: `${Math.round(Math.random() * 1000)} DKK`,
            detail: Math.round(Math.random() * 100),
          },
        ]);
      }
    }
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(moreToLoad);
      }, 2500);
    });
  }
}
