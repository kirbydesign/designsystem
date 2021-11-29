import { Component } from '@angular/core';

import { ListSwipeAction } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-item-sliding-example',
  templateUrl: './item-sliding-example.component.html',
  styleUrls: [],
})
export class ItemSlidingExampleComponent {
  swipeActions: ListSwipeAction[][] = [
    [
      {
        title: 'delete',
        position: 'left',
        onSelected: (item) => console.log(item),
        type: 'danger',
      },
      {
        title: 'edit',
        position: 'left',
        icon: 'link',
        type: 'success',
        onSelected: (item) => console.log(item),
      },
      {
        title: 'archive',
        position: 'left',
        icon: () => 'link',
        onSelected: (item) => console.log(item),
        type: 'warning',
      },
    ],
    [],
  ];

  toggleSwipeActions() {
    this.swipeActions.reverse();
  }
}
