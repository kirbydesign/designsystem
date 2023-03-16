import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PlatformService, ThemeColor } from '@kirbydesign/designsystem/helpers';
import { BoundaryClass } from '../list-item-swipe/list-item-swipe.component';
import { ListSwipeAction } from '../list-swipe-action.type';
import { DeviceType } from './devicetype';
import { ListItem } from './list-item';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss'],
})
export class ListItemComponent {
  public device: DeviceType;
  @Input() item: ListItem;

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

  constructor(platformService: PlatformService) {
    this.device = platformService.isTouch() ? 'mobile' : 'desktop';
  }
}
