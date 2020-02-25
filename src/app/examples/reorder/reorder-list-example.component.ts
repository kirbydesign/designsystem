import { Component } from '@angular/core';

@Component({
  selector: 'kirby-reorder-list-example',
  templateUrl: './reorder-list-example.component.html',
  styleUrls: ['./reorder-list-example.component.scss'],
})
export class ReorderListExampleComponent {
  items: any[] = [
    {
      title: 'Holiday with friends',
      amount: -37445.02325,
      ownerName: 'Julie',
      isOwnAccount: false,
      shadowAccounts: [
        {
          title: 'Food',
          amount: 376.12,
        },
        {
          title: 'Car',
          amount: 62376.12,
        },
        {
          title: 'Misc',
          amount: 2376.12,
        },
      ],
    },
    {
      title: 'Savings',
      amount: 923367.2356,
    },
    {
      title: 'Expenses',
      amount: 65128.45,
      ownerName: 'John',
      isOwnAccount: true,
      shadowAccounts: [
        {
          title: 'Food',
          amount: 376.12,
        },
        {
          title: 'Car',
          amount: 62376.12,
        },
        {
          title: 'Misc',
          amount: 2376.12,
        },
      ],
    },
  ];

  items2: any[] = [...this.items.filter((item) => item.shadowAccounts != null)];

  constructor() {}

  doReorderItem(ev: any) {
    ev.detail.complete(this.items);
  }

  doReorderShadowAccount(ev: any) {
    ev.detail.complete(ev.detail.parentItem.shadowAccounts);
  }
}
