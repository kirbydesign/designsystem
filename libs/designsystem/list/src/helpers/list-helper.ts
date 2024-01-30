import { Injectable } from '@angular/core';

import { ListComponent } from '../list.component';

type Section<T> = {
  name: string;
  items: T[];
};

type SectionWithStandAloneItems<T> = {
  name: string;
  lists: T[][];
};

@Injectable()
export class ListHelper {
  public onLoadOnDemand(component: ListComponent) {
    if (component.isLoadOnDemandEnabled && !component._isLoading) {
      component._isLoading = true;
      component.loadOnDemand.emit({
        complete: (disableLoadOnDemand: boolean) => {
          component.isLoadOnDemandEnabled = !disableLoadOnDemand;
          component._isLoading = false;
        },
      });
    }
  }

  public groupSections<T>(items: T[], getGroupName: (item: T) => string): Section<T>[] {
    const groupsMap = new Map<string, T[]>();

    items.forEach((item) => {
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

  public groupStandAloneItems<T>(items: T[], standAloneProperty: string): { items: T[] }[] {
    const list = items.reduce(
      (accumulator, item) => {
        const lastList = accumulator[accumulator.length - 1];
        const lastItemInList = lastList[lastList.length - 1];

        if (!lastItemInList) {
          lastList.push(item);
        } else if (!item[standAloneProperty] && !lastItemInList[standAloneProperty]) {
          lastList.push(item);
        } else {
          accumulator.push([item]);
        }

        return accumulator;
      },
      [[]] as [T[]]
    );

    return list.map((items) => {
      return { items };
    });
  }

  public groupSectionsWithStandAloneItems<T>(
    items: T[],
    getGroupName: (item: T) => string,
    standAloneProperty: string
  ): SectionWithStandAloneItems<T>[] {
    const sectionsMap = new Map<string, T[][]>();

    items.forEach((item) => {
      const sectionName = getGroupName(item);

      if (sectionsMap.has(sectionName)) {
        const section = sectionsMap.get(sectionName);
        const lastListInSection = section[section.length - 1];
        const lastItemInList = lastListInSection[lastListInSection.length - 1];

        if (!item[standAloneProperty] && !lastItemInList[standAloneProperty]) {
          lastListInSection.push(item);
        } else {
          section.push([item]);
        }
      } else {
        sectionsMap.set(sectionName, [[item]]);
      }
    });

    return Array.from(sectionsMap)
      .sort(([name], [otherName]) => name.localeCompare(otherName))
      .map(([name, lists]) => {
        return { name, lists };
      });
  }
}
