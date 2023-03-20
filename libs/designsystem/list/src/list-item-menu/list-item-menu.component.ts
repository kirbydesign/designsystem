import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem/helpers';

import { BoundaryClass } from '../list-item-swipe/list-item-swipe.component';
import { ListItem } from '../list-item/list-item';
import { ListItemMenuAction } from './list-item-menu-action';

@Component({
  selector: 'kirby-list-item-menu',
  templateUrl: './list-item-menu.component.html',
  styleUrls: ['./list-item-menu.component.css'],
})
export class ListItemMenuComponent {
  @Input() item: ListItem;
  @Input() boundaryClass: BoundaryClass | BoundaryClass[];
  @Input() actions: ListItemMenuAction[] = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() isSelected: boolean;
  @Input() isSelectable: boolean;
  @Input() getItemColor: (item: any) => ThemeColor;

  @Output() itemSelect = new EventEmitter<any>();
  @Output() swipeActionSelect = new EventEmitter<any>();

  _onItemSelect(item: any) {
    if (!this.isSelectable) return;
    this.itemSelect.emit(item);
  }
}
