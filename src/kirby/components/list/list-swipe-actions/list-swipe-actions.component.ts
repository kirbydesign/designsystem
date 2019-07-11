import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ListHelper } from '../helpers/list-helper';

@Component({
  selector: 'kirby-list-swipe-actions',
  templateUrl: './list-swipe-actions.component.html',
})
export class ListSwipeActionsComponent {
  @Input() side: 'start' | 'end' = 'start';

  @Output() fullSwipe = new EventEmitter<boolean>();

  constructor(private listHelper: ListHelper) {}

  onItemSwipe() {
    this.fullSwipe.emit(true);
    this.listHelper.closeActionItems();
  }
}
