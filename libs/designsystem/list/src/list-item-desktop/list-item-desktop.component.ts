import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeColor } from '@kirbydesign/designsystem/helpers';
import { BoundaryClass } from '../list-item-mobile/list-item-mobile.component';
import { ListSwipeAction } from '../list-swipe-action.type';

@Component({
  selector: 'kirby-list-item-desktop',
  templateUrl: './list-item-desktop.component.html',
  styleUrls: ['./list-item-desktop.component.css'],
})
export class ListItemDesktopComponent {
  @Input() item: any;

  @Input() boundaryClass: BoundaryClass | BoundaryClass[];

  @Input() swipeActions: ListSwipeAction[] = [];

  @Input() itemTemplate: TemplateRef<any>;

  @Input() isSelected: boolean;

  @Input() isSelectable: boolean;

  @Input() getItemColor: (item: any) => ThemeColor;

  @Output() itemSelect = new EventEmitter<any>();

  _onItemSelect(item: any) {
    if (!this.isSelectable) return;
    this.itemSelect.emit(item);
  }

  @Output() swipeActionSelect = new EventEmitter<any>();

  _hasSwipeActions(item: any): boolean {
    if (!Array.isArray(this.swipeActions)) {
      return false;
    }
    return this.swipeActions.some((swipeAction) => {
      if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
        return false;
      }
      if (swipeAction.isDisabled === true) {
        return false;
      }
      return swipeAction.position === 'left' || swipeAction.position === 'right';
    });
  }
}
