import { Pipe, PipeTransform } from '@angular/core';
import { ItemSlidingSide } from '@kirbydesign/designsystem/item-sliding';
import { DeviceType, ListItem } from '../../list-item.component';

export type ListItemAction = {
  isDisabled: ((item: ListItem) => boolean) | boolean;
  position: ItemSlidingSide;
};

@Pipe({
  name: 'hasActions',
})
export class HasActionsPipe implements PipeTransform {
  transform(item: ListItem, args): unknown {
    const swipeActions: ListItemAction[] = args[0];
    const device: DeviceType = args[1];

    if (!Array.isArray(swipeActions)) {
      return false;
    }
    return swipeActions.some((swipeAction) => {
      if (swipeAction.isDisabled instanceof Function && swipeAction.isDisabled(item)) {
        return false;
      }
      if (swipeAction.isDisabled === true) {
        return false;
      }
      return device === 'desktop'
        ? true
        : swipeAction.position === 'left' || swipeAction.position === 'right';
    });
  }
}
