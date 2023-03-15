import { Pipe, PipeTransform } from '@angular/core';
import { ListItem } from '../../list-item.component';
import { ListItemAction } from '../has-actions/has-actions.pipe';

@Pipe({
  name: 'getActionIcon',
})
export class GetActionIconPipe implements PipeTransform {
  transform(action: ListItemAction, ...args: unknown[]): string {
    const item: ListItem = args[0] as ListItem;

    if (!action.icon) return;

    return action.icon instanceof Function ? action.icon(item) : action.icon;
  }
}
