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

import { ListSwipeAction } from '../';
import { PlatformService, ThemeColor } from '../../../helpers';
import { SwipeDirection, SwipeEnd } from '../list-swipe-action';
import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss', './list-item.component.scss'],
})
export class ListItemComponent implements OnInit, AfterViewInit {
  isSwipingEnabled: boolean = false;
  @Input() item: any;
  @Input() orderClass: string;
  @ViewChild(IonItemSliding) ionItemSliding: IonItemSliding;
  constructor(public listComponent: ListComponent, private platform: PlatformService) {
    this.initializeSwipeActions();
  }

  /**
   * Determines if list items should have swipe actions or not
   * - the order of swipe actions is used to determine edge actions,
   * as well as their order of appearance on the screen.
   */
  @Input() swipeActions: ListSwipeAction[] = [];

  @Input()
  itemTemplate: TemplateRef<any>;

  @Input() isSelected: boolean;

  @Input() isSelectable: boolean;

  @Input()
  getItemColor: (item: any) => ThemeColor;

  /**
   * Emitting event when an item is selected (tapped on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  @Output() swipeActionSelect = new EventEmitter<any>();

  ngOnInit() {
    this.initializeSwipeActions();
  }

  ngAfterViewInit(): void {
    if (!this.itemTemplate) {
      console.warn('No item template was provided.');
    }
  }

  onSwipeActionSelect(swipeAction, item, event) {
    this.swipeActionSelect.emit({
      swipeAction,
      item,
      event,
    });
  }

  onItemSelect(item: any) {
    if (!this.isSelectable) return;
    this.itemSelect.emit(item);
  }

  hasSwipeActions(item: any): boolean {
    if (!Array.isArray(this.swipeActions)) {
      return false;
    }
    return this.swipeActions.some((sa) => {
      if (sa.isDisabled instanceof Function && sa.isDisabled(item)) {
        return false;
      }
      if (sa.isDisabled === true) {
        return false;
      }
      return sa.position === SwipeDirection.left || sa.position === SwipeDirection.right;
    });
  }

  getSwipeActions(item: any, side?: SwipeDirection): ListSwipeAction[] {
    if (!Array.isArray(this.swipeActions)) {
      return [];
    }
    return this.swipeActions.filter((sa) => {
      if (sa.isDisabled instanceof Function && sa.isDisabled(item)) {
        return false;
      }
      if (sa.isDisabled === true) {
        return false;
      }
      return side ? sa.position === side : true;
    });
  }

  getSwipeActionEnd(item: any): SwipeEnd {
    if (this.getSwipeActions(item, SwipeDirection.left).length) {
      return SwipeEnd.start;
    }
    if (this.getSwipeActions(item, SwipeDirection.right).length) {
      return SwipeEnd.end;
    }
  }

  getSwipeActionIcon(swipeAction: ListSwipeAction, item: any): string {
    if (!swipeAction.icon) return;

    if (swipeAction.icon instanceof Function) {
      return swipeAction.icon(item);
    }
    return swipeAction.icon;
  }

  getSwipeActionTitle(swipeAction: ListSwipeAction, item: any): string {
    if (swipeAction.title instanceof Function) {
      return swipeAction.title(item);
    }
    return swipeAction.title;
  }

  getSwipeActionType(swipeAction: ListSwipeAction, item: any): ThemeColor {
    if (swipeAction.type instanceof Function) {
      return swipeAction.type(item);
    }
    return swipeAction.type;
  }

  private initializeSwipeActions(): void {
    if (this.swipeActions && this.swipeActions.length) {
      this.isSwipingEnabled = this.platform.isTouch();
    }
  }
}
