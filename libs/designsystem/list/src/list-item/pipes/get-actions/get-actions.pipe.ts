import { Pipe, PipeTransform } from '@angular/core';
import { ItemSlidingSide } from '@kirbydesign/designsystem/item-sliding';
import { DeviceType } from '../../devicetype';
import { ListItem } from '../../list-item';
import { ListItemAction } from '../has-actions/has-actions.pipe';

@Pipe({
  name: 'getActions',
})
export class GetActionsPipe implements PipeTransform {
  transform(item: ListItem, args): ListItemAction[] {
    const actions: ListItemAction[] = args[0];
    const device: DeviceType = args[1];
    const direction: ItemSlidingSide = args[2];

    if (!Array.isArray(actions)) {
      return [];
    }
    return actions.filter((swipeAction) => {
      if (isActionDisabled(swipeAction, item)) {
        return false;
      }
      if (device === 'desktop') {
        return true;
      }
      return direction ? swipeAction.position === direction : true;
    });
  }
}

const isActionDisabled = (action: ListItemAction, item: ListItem): boolean => {
  if (action.isDisabled instanceof Function && action.isDisabled(item)) {
    return true;
  }
  return action.isDisabled === true;
};
