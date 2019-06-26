import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item-sliding',
  templateUrl: './list-item-sliding.component.html',
  styleUrls: ['./list-item-sliding.component.scss'],
})
export class ListItemSlidingComponent {
  @Input() isSlidingEnabled: boolean;

  leftItems = ['Share', 'Unread', 'Archive'];
  rightItems = ['Undo', 'Delete'];
}
