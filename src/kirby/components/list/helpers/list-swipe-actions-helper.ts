import { IonList } from '@ionic/angular';

import { ListSwipeAction } from './list-swipe-action';

declare var require: any;
const style: any = require('sass-extract-loader!../list.component.scss');

export class ListSwipeActionsHelper {
  private list: IonList;
  swipeActionSelections = {};

  setList(list: IonList): void {
    this.list = list;
  }

  getIsSwipingDisabled(): boolean {
    const large = style.global['$breakpoints'].value['large'].value;
    const disabled = window.innerWidth >= large;

    if (disabled) {
      this.closeActionItems();
    }
    return disabled;
  }

  getIsSwipeActionSelected(swipeAction: ListSwipeAction, item: any): boolean {
    return item ? item[swipeAction.swipeActionFlag] : false;
  }

  onSwipeActionSelected(swipeAction: ListSwipeAction, item: any): void {
    this.closeActionItems();
    swipeAction.onSelected(item);
    this.swipeActionSelections = {};
  }

  // {N}-only
  onSwipeCellStarted(_: any): void {}

  // {N}-only
  onCellSwiping(_: any): void {}

  // {N}-only
  onSwipeCellFinished(___: any, __: any, _: any): void {}

  private closeActionItems(): void {
    if (this.list) {
      this.list.closeSlidingItems();
    }
  }
}
