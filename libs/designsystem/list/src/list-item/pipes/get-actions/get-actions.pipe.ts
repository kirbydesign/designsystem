import { Pipe, PipeTransform } from '@angular/core';
import { ItemSlidingSide } from '@kirbydesign/designsystem/item-sliding';
import { DeviceType, ListItem } from '../../list-item.component';
import { ListItemAction } from '../has-actions/has-actions.pipe';

@Pipe({
  name: 'getActions',
})
export class GetActionsPipe implements PipeTransform {
  transform(item: ListItem, args): unknown {
    const swipeActions: ListItemAction[] = args[0];
    const device: DeviceType = args[1];
    const direction: ItemSlidingSide = args[2];

    if (!Array.isArray(swipeActions)) {
      return [];
    }
    return swipeActions.filter((swipeAction) => {
      if (isSwipeActionDisabled(swipeAction, item)) {
        return false;
      }
      if (device === 'desktop') {
        return true;
      }
      return direction ? swipeAction.position === direction : true;
    });
  }
}

const isSwipeActionDisabled = (swipeAction: ListItemAction, item: any): boolean => {
  if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
    return true;
  }
  return swipeAction.isDisabled === true;
};
