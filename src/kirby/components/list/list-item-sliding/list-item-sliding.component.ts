import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item-sliding',
  templateUrl: './list-item-sliding.component.html',
  styleUrls: ['./list-item-sliding.component.scss'],
})
export class ListItemSlidingComponent {
  @Input() isSlidingEnabled: boolean;

  leftItems: SlidingItemProperty[] = [
    {
      name: 'Share',
      icon: 'share',
      color: 'secondary',
    },
    {
      name: 'Delete',
      icon: 'trash',
      color: 'primary',
    },
  ];
  rightItems: SlidingItemProperty[] = [
    {
      icon: 'undo',
      color: 'danger',
    },
    {
      name: 'Archive',
      color: 'warning',
    },
  ];

  onClick(item: SlidingItemProperty) {
    console.log(`Sliding item selection: ${JSON.stringify(item)}`);
  }
}

interface SlidingItemProperty {
  name?: string;
  icon?: string;
  color: string;
}
