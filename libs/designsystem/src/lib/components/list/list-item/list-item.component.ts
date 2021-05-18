import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { PlatformService } from '../../../helpers/platform.service';
import { ThemeColor } from '../../../helpers/theme-color.type';
import { ListSwipeAction, SwipeDirection, SwipeEnd } from '../list-swipe-action';

export enum EndClass {
  first = 'first',
  last = 'last',
}

export type ListItem = {
  id?: number;
  title?: string;
  subTitle?: string;
  value?: string | number;
  amount?: string;
  detail?: string | number;
  color?: string;
  flagged?: string;
  deleted?: boolean;
  archived?: boolean;
  isDisabled?: boolean;
  headingName?: string;
};

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss', './list-item.component.scss'],
})
export class ListItemComponent implements OnInit, AfterViewInit {
  _isSwipingEnabled = false;

  constructor(private platform: PlatformService) {
    this.initializeSwipeActions();
  }

  @ViewChild(IonItemSliding) ionItemSliding: IonItemSliding;

  @Input() item: ListItem;

  @Input() endClass: EndClass;

  @Input() swipeActions: ListSwipeAction[] = [];

  @Input() itemTemplate: TemplateRef<any>;

  @Input() isSelected: boolean;

  @Input() isSelectable: boolean;

  @Input() getItemColor: (item: ListItem) => ThemeColor;

  @Output() itemSelect = new EventEmitter<any>();

  onItemSelect(item: ListItem) {
    if (!this.isSelectable) return;
    this.itemSelect.emit(item);
  }

  @Output() swipeActionSelect = new EventEmitter<any>();

  onSwipeActionSelect(swipeAction, item, event) {
    this.swipeActionSelect.emit({
      swipeAction,
      item,
      event,
    });
  }

  ngOnInit() {
    this.initializeSwipeActions();
  }

  ngAfterViewInit(): void {
    if (!this.itemTemplate) {
      console.warn('No item template was provided.');
    }
  }

  hasSwipeActions(item: ListItem): boolean {
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
      return (
        swipeAction.position === SwipeDirection.left ||
        swipeAction.position === SwipeDirection.right
      );
    });
  }

  getSwipeActions(item: ListItem, side?: SwipeDirection): ListSwipeAction[] {
    if (!Array.isArray(this.swipeActions)) {
      return [];
    }
    return this.swipeActions.filter((swipeAction) => {
      if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
        return false;
      }
      if (swipeAction.isDisabled === true) {
        return false;
      }
      return side ? swipeAction.position === side : true;
    });
  }

  getSwipeActionEnd(item: ListItem): SwipeEnd {
    if (this.getSwipeActions(item, SwipeDirection.left).length) {
      return SwipeEnd.start;
    }
    if (this.getSwipeActions(item, SwipeDirection.right).length) {
      return SwipeEnd.end;
    }
  }

  getSwipeActionIcon(swipeAction: ListSwipeAction, item: ListItem): string {
    if (!swipeAction.icon) return;

    if (swipeAction.icon instanceof Function) {
      return swipeAction.icon(item);
    }
    return swipeAction.icon;
  }

  getSwipeActionTitle(swipeAction: ListSwipeAction, item: ListItem): string {
    if (swipeAction.title instanceof Function) {
      return swipeAction.title(item);
    }
    return swipeAction.title;
  }

  getSwipeActionType(swipeAction: ListSwipeAction, item: ListItem): ThemeColor {
    if (swipeAction.type instanceof Function) {
      return swipeAction.type(item);
    }
    return swipeAction.type;
  }

  private initializeSwipeActions(): void {
    if (this.swipeActions && this.swipeActions.length) {
      this._isSwipingEnabled = this.platform.isTouch();
    }
  }
}
