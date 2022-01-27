import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-list-experimental-showcase',
  templateUrl: './list-experimental-showcase.component.html',
  styleUrls: ['./list-experimental-showcase.component.scss'],
})
export class ListShowcaseComponent {
  swipeActions: ItemSwipeAction[] = [
    {
      title: 'edit',
      type: 'success',
      onSelected: () => {},
    },
    {
      title: 'archive',
      type: 'warning',
      onSelected: () => {},
    },
    {
      title: 'delete',
      icon: 'trash',
      onSelected: () => {},
      type: 'danger',
    },
  ];
}
