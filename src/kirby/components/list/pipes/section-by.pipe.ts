import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectionBy'
})
export class SectionByPipe implements PipeTransform {

  transform(collection: any[], callback?: (item: any) => string): any {
    if (!collection) {
      return null;
    }
    if (!callback) {
      return collection;
    }

    const map = new Map<string, any[]>();

    collection.forEach((item: any) => {
      const itemSection = callback(item);
      const sectionItems = map.get(itemSection);

      if (sectionItems) {
        sectionItems.push(item);
      } else {
        map.set(itemSection, [item]);
      }
    });

    return Array.from(map)
          .map((keyValue: any[]) => {
            return {name: keyValue[0], items: keyValue[1]};
          });
  }

}
