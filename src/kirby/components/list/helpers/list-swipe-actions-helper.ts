import { IonList } from '@ionic/angular';

import { ListSwipeAction } from './list-swipe-action';

declare var require: any;
const style: any = require('sass-extract-loader!../list.component.scss');

export class ListSwipeActionsHelper {
  swipeActionSelections = {};

  getIsSwipingDisabled(): boolean {
    const large = style.global['$breakpoints'].value['large'].value;
    const disabled = window.innerWidth >= large;
    return disabled;
  }

  getIsSwipeActionSelected(swipeAction: ListSwipeAction, item: any): boolean {
    return item ? item[swipeAction.swipeActionFlag] : false;
  }

  onSwipeActionSelected(swipeAction: ListSwipeAction, item: any): void {
    swipeAction.onSelected(item);
    this.swipeActionSelections = {};
  }

  closeSwipeActions(list: IonList): void {
    if (list) {
      list.closeSlidingItems();
    }
  }

  // {N}-only
  onSwipeCellStarted(_: any): void {}

  // {N}-only
  onCellSwiping(_: any): void {}

  // {N}-only
  onSwipeCellFinished(___: any, __: any, _: any): void {}
}
