import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';
import { ListSwipeAction } from '@kirbydesign/designsystem/list';

@Component({
  selector: 'kirby-list-swipe-example',
  templateUrl: './list-swipe-example.component.html',
  styleUrls: ['./list-swipe-example.component.scss'],
})
export class ListSwipeExampleComponent extends BaseListComponent {
  swipeActions: ListSwipeAction[] = [
    {
      position: 'left',
      title: 'Archive',
      themeColor: 'warning',
      onSelected: this.onArchiveItem,
      isDisabled: (item) => item.archived || item.id === 3,
    },
    {
      position: 'left',
      title: 'Flag',
      iconName: (item) => (item.flagged ? null : 'attach'),
      themeColor: 'success',
      onSelected: this.onFlagItem,
      isDisabled: (item) => item.id === 3,
    },
    {
      position: 'right',
      title: (item) => (item.deleted ? 'UnDelete' : 'Delete'),
      iconName: 'trash',
      themeColor: (item) => (item.deleted ? 'warning' : 'danger'),
      onSelected: this.onDeleteItem,
      isDisabled: (item) => item.id === 3,
    },
  ];

  constructor() {
    super();
  }

  private onArchiveItem(item: any): void {
    console.log(`onArchiveItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.archived = !item.archived;
  }

  private onFlagItem(item: any): void {
    console.log(`onFlagItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.flagged = !item.flagged;
  }

  private onDeleteItem(item: any): void {
    console.log(`onDeleteItem called on item with id: ${item.id}...`);
    // supposing that there should be a call to the back-end here...
    item.deleted = !item.deleted;
  }
}
