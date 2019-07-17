import { SwipeActionsEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';

import { ListSwipeAction } from './list-swipe-action';

// TODO: Once https://github.com/NativeScript/nativescript-ui-feedback/issues/1168
// is implemented, we have to revisit this file and redesign the full-swipe / part-swipe functionalities
export class ListSwipeActionsHelper {
  swipeActionSelections = {};
  item: any;

  onSwipeCellStarted(args: SwipeActionsEventData): void {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args.swipeView;
    const mainView = args['mainView'];

    // The bindingContext provides the item that is being swiped and
    // allows us to get the selected values for each swipe action
    this.item = mainView.bindingContext;
    this.swipeActionSelections = {};

    const leftView = <View>swipeView.getViewById('swipe-actions-left');

    swipeLimits.left = leftView.getMeasuredWidth();
    swipeLimits.right = swipeView.getMeasuredWidth();
    swipeLimits.threshold = swipeView.getMeasuredWidth() / 4;
  }

  onCellSwiping(args: SwipeActionsEventData): void {
    // handle logic that will be executed when swiping
  }

  onSwipeCellFinished(
    args: SwipeActionsEventData,
    ltrCallback: (item: any) => void,
    rtlCallback: (item: any) => void
  ): void {
    if (args.data.x < 0) {
      rtlCallback(this.item);
    }
  }

  onSwipeActionSelected(swipeAction: ListSwipeAction, _: any): void {
    this.closeActionItems();
    swipeAction.onSelected(this.item);
    this.swipeActionSelections = {};
  }

  getIsSwipeActionSelected(swipeAction: ListSwipeAction, _: any): boolean {
    return this.item ? this.item[swipeAction.swipeActionFlag] : false;
  }

  // Web-only
  getIsSwipingDisabled(): boolean {
    return false;
  }

  // Web-only
  setList(list: any): void {
    // TODO: implement on native if needed
  }

  // Web-only
  closeActionItems(): void {
    // TODO: implement on native
  }
}
