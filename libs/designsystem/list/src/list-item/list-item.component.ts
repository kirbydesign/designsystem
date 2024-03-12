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
import { IonItemSliding } from '@ionic/angular/standalone';

import { ThemeColor } from '@kirbydesign/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';

import { ListSwipeAction, ListSwipeDirection, ListSwipeEnd } from '../list-swipe-action.type';

export type BoundaryClass = 'first' | 'last';

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

  _onSwipeActionSelect(swipeAction, item, event) {
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

  _getSwipeActions(item: any, direction?: ListSwipeDirection): ListSwipeAction[] {
    if (!Array.isArray(this.swipeActions)) {
      return [];
    }
    return this.swipeActions.filter((swipeAction) => {
      if (this.isSwipeActionDisabled(swipeAction, item)) {
        return false;
      }
      return direction ? swipeAction.position === direction : true;
    });
  }

  private isSwipeActionDisabled(swipeAction: ListSwipeAction, item: any): boolean {
    if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
      return true;
    }
    return swipeAction.isDisabled === true;
  }

  _getSwipeActionEnd(item: any): ListSwipeEnd {
    if (this._getSwipeActions(item, 'left').length) {
      return 'start';
    }
    return 'end';
  }

  _getSwipeActionIcon(swipeAction: ListSwipeAction, item: any): string {
    if (!swipeAction.icon) return;

    if (swipeAction.icon instanceof Function) {
      return swipeAction.icon(item);
    }
    return swipeAction.icon;
  }

  _getSwipeActionTitle(swipeAction: ListSwipeAction, item: any): string {
    if (swipeAction.title instanceof Function) {
      return swipeAction.title(item);
    }
    return swipeAction.title;
  }

  _getSwipeActionType(swipeAction: ListSwipeAction, item: any): ThemeColor {
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
