import { SwipeActionsEventData } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular/listview-directives';
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
    const mainView = args.mainView;
    const swipeActionsContainerView = <View>swipeView.getViewById('swipe-actions-container');

    // The bindingContext provides the item that is being swiped and
    // allows us to get the selected values for each swipe action
    this.item = mainView.bindingContext;
    const leftView = <View>swipeView.getViewById('swipe-actions-left');
    const rightView = <View>swipeView.getViewById('swipe-actions-right');
    this.swipeActionSelections = {};

    swipeLimits.left = leftView.getMeasuredWidth();
    swipeLimits.right = rightView.getMeasuredWidth();

    // need to exceed two thirds of the smaller of the two sides to keep the swipe items open
    swipeLimits.threshold =
      (Math.min(leftView.getMeasuredWidth(), rightView.getMeasuredWidth()) * 2) / 3;

    // both sides are shown by default on Android, hence we need to hide them explicitly
    if (args.data.x > 0) {
      leftView.visibility = 'visible';
    } else if (args.data.x < 0) {
      rightView.visibility = 'visible';
    }

    // apply custom styles to elements
    const child = mainView.getViewById('row');
    if (child.className.indexOf('first') > 0) {
      //TODO fix the rounded corner styling here if the list is not square.
    }

    if (child.className.indexOf('last') > 0) {
      //TODO fix the rounded corner styling here if the list is not square.
    }
  }

  onCellSwiping(args: SwipeActionsEventData): void {
    const swipeView = args.swipeView;
    const leftView = <View>swipeView.getViewById('swipe-actions-left');
    const rightView = <View>swipeView.getViewById('swipe-actions-right');
    // both sides are shown by default on Android, hence we need to hide them explicitly
    if (args.data.x > 0) {
      leftView.visibility = 'visible';
      rightView.visibility = 'hidden';
    } else if (args.data.x < 0) {
      leftView.visibility = 'hidden';
      rightView.visibility = 'visible';
    }
  }

  onSwipeActionSelected(swipeAction: ListSwipeAction, _: any): void {
    swipeAction.onSelected(this.item);
    this.swipeActionSelections = {};
  }

  getIsSwipeActionSelected(swipeAction: ListSwipeAction, _: any): boolean {
    return this.item ? this.item[swipeAction.swipeActionFlag] : false;
  }

  closeSwipeActions(list: RadListViewComponent): void {
    if (list) {
      list.listView.notifySwipeToExecuteFinished();
    }
  }

  getIsSwipingDisabled(): boolean {
    return false;
  }
}
