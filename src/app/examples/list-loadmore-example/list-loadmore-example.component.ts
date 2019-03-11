import { BaseListComponent } from './../list-example/base-list.component';
import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'kirby-list-loadmore-example',
  templateUrl: './list-loadmore-example.component.html',
  styleUrls: ['./list-loadmore-example.component.scss'],
})

export class ListLoadmoreExampleComponent extends BaseListComponent {
  private transactionIdCount = 1;
  constructor() {
    super();
  }

  onLoadMoreItemsCallback(): Promise<boolean> {
    return Promise.resolve(false);
  }

  onScroll(event: any) {
    alert('JVH SCROLL ' + event.target.scrollTop);
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log('Scroll y ' + scrollY);
  }

  onLoadMore() {
    this.addItems(this.generateTransactions());
  }

  private generateTransactions(): any[] {
    const transactions = [];
    const numberOfTransactions = 100;
    for (let index = 1; index < numberOfTransactions; index++) {
      const transaction = {
        title: 'Transaction ' + this.transactionIdCount,
        subTitle: this.transactionIdCount + ' stk',
        amount: this.transactionIdCount + ' DKK',
      };
      transactions.push(transaction);
      this.transactionIdCount++;
    }
    return transactions;
  }
}
