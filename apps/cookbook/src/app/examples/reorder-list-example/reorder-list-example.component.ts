import { Component } from '@angular/core';

import { ReorderEvent } from '@kirbydesign/designsystem/reorder-list';

@Component({
  selector: 'cookbook-reorder-list-example',
  templateUrl: './reorder-list-example.component.html',
  styleUrls: ['./reorder-list-example.component.scss'],
})
export class ReorderListExampleComponent {
  items: any[] = [
    {
      title: '1',
      ownerName: 'xyz',
      isOwnAccount: false,
      shadowAccounts: [
        {
          title: '1a',
        },
        {
          title: '1b',
        },
        {
          title: '1c',
        },
        {
          title: '1d',
        },
        {
          title: '1e',
        },
        {
          title: '1f',
        },
      ],
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
      ownerName: 'John',
      isOwnAccount: true,
      shadowAccounts: [
        {
          title: '4a',
        },
      ],
    },
    {
      title: '5',
      isOwnAccount: true,
      shadowAccounts: [
        {
          title: '5a',
        },
      ],
    },
  ];
  headerTexts = ['hide/show', 'move'];

  doReorderItem(ev: ReorderEvent) {
    ev.complete(this.items);
  }

  doReorderShadowAccount(ev: ReorderEvent) {
    ev.complete(ev.parentItem.shadowAccounts);
  }
}
