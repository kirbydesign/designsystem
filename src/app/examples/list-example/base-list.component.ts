import { ObservableArray } from 'tns-core-modules/data/observable-array';

export class BaseListComponent {

  myObservableItems: ObservableArray<any>;

  constructor() {

    // If you need to use the LoadMoreItems functionality of Kirby which is built on top of RadListView,
    // the items array must be Observable.
    this.myObservableItems = new ObservableArray();

    this.myObservableItems.push({title: 'Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225});
    this.myObservableItems.push({title: 'A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: 0});
    this.myObservableItems.push({title: 'Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171});
    this.myObservableItems.push({title: 'Danske Bank A/S', subTitle: '10 stk', amount: '1560 DKK', detail: -171});
  }

  onItemSelect(item: any) {
    alert(`You have clicked the row [${item.title} ${item.amount}]`);
  }
}
