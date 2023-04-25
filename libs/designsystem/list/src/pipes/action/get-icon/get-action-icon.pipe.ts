import { Pipe, PipeTransform } from '@angular/core';
import { ListSwipeAction } from '../../../list-swipe-action.type';

@Pipe({
  name: 'getActionIcon',
})
export class GetActionIconPipe implements PipeTransform {
  transform(action: ListSwipeAction, ...args: unknown[]): string {
    const item = args[0];

    if (!action.icon) return;

    return action.icon instanceof Function ? action.icon(item) : action.icon;
  }
}
