import { Pipe, PipeTransform } from '@angular/core';
import { ListSwipeAction } from '../../list-swipe-action.type';
@Pipe({
  name: 'getActionTitle',
})
export class GetActionTitlePipe implements PipeTransform {
  transform(action: ListSwipeAction, ...args: any[]): string {
    const item = args[0];
    return action.title instanceof Function ? action.title(item) : action.title;
  }
}
