import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(items: any[], getGroupName?: (item: any) => string): any {
    if (!items) {
      return null;
    }
    if (!getGroupName) {
      return items;
    }

    const groupsMap = new Map<string, any[]>();

    items.forEach((item: any) => {
      const itemGroup = getGroupName(item);
      const groupItems = groupsMap.get(itemGroup);

      if (groupItems) {
        groupItems.push(item);
      } else {
        groupsMap.set(itemGroup, [item]);
      }
    });

    return Array.from(groupsMap)
          .map((keyValue: any[]) => {
            return {name: keyValue[0], items: keyValue[1]};
          });
  }

}
