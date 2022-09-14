import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform(items: any[], getGroupName?: (item: any) => string): any[] {
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
      .sort(([name], [otherName]) => name.localeCompare(otherName))
      .map(([name, items]) => {
        return { name, items };
      });
  }

  transformListWithStandAlone(
    items: any[],
    standAloneProperty: string,
    returnValue: 'arrays' | 'objects'
  ) {
    let currentArrayIndex = 0;

    const list = items.reduce((accumulator, item) => {
      if (!accumulator[currentArrayIndex]) {
        accumulator[currentArrayIndex] = [];
      }

      if (item[standAloneProperty]) {
        accumulator.push([item]);

        /**
         * currentArrayIndex is incremented by 2 to skip the index of
         * the stand alone item array, that is pushed into the multidimensional array
         */
        currentArrayIndex += 2;
      } else {
        accumulator[currentArrayIndex].push(item);
      }

      return accumulator;
    }, []);

    if (returnValue === 'arrays') {
      return list;
    }

    return list.map((items) => {
      return { items };
    });
  }

  transformGroupedListWithStandAlone(
    items: any[],
    getGroupName: (item: any) => string,
    standAloneProperty: string
  ): any[] {
    const sections = this.transform(items, getGroupName);

    const sectionsWithStandAloneItems = sections.map((section) => {
      const sectionsLists = this.transformListWithStandAlone(
        section.items,
        standAloneProperty,
        'arrays'
      );
      return { name: section.name, lists: sectionsLists };
    });

    return sectionsWithStandAloneItems;
  }
}
