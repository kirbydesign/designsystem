import { Component } from '@angular/core';

import { ListSwipeAction } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-item-sliding-example',
  templateUrl: './item-sliding-example.component.html',
  styleUrls: [],
})
export class ItemSlidingExampleComponent {
  items = [
    {
      id: 0,
      value: 'brbrbrb',
    },
    {
      id: 1,
      value: 'ararar',
    },
  ];

  swipeActions(index: number): ListSwipeAction[] {
    return [
      {
        title: 'delete',
        position: 'left',
        onSelected: () => console.log('delete clicked', this.items[index]),
        type: 'danger',
        isDisabled: index % 2 === 0,
      },
      {
        title: 'edit',
        position: 'left',
        icon: 'link',
        type: 'success',
        onSelected: () => console.log(index),
      },
      {
        title: 'archive',
        position: 'left',
        icon: () => 'link',
        onSelected: () => console.log(index),
        type: 'warning',
      },
    ];
  }

  toggleSwipeActions() {}
}
