import { Pipe, PipeTransform } from '@angular/core';
import { ListSwipeAction } from '../../../list-swipe-action.type';

@Pipe({
  name: 'getActions',
})
export class GetActionsPipe implements PipeTransform {
  transform(item: any, swipeActions: ListSwipeAction[]): ListSwipeAction[] {
    if (!Array.isArray(swipeActions)) {
      return [];
    }

    return swipeActions.filter((swipeAction) => !this.isSwipeActionDisabled(swipeAction, item));
  }

  private isSwipeActionDisabled = (swipeAction: ListSwipeAction, item: any): boolean => {
    if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
      return true;
    }
    return swipeAction.isDisabled === true;
  };
}
