import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectionBy'
})
export class SectionByPipe implements PipeTransform {

  transform(collection: any[], callback?: (item: any) => string): any {

    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }

    if (!callback) {
      return collection;
    }

    const sectionKeyValueMap = collection.reduce((keyValueMap, item) => {
      const sectionKey = callback(item);
        if (!keyValueMap[sectionKey]) {
            keyValueMap[sectionKey] = [item];
        } else {
            keyValueMap[sectionKey].push(item);
        }

        return keyValueMap;
    }, {});

    // this will return an array of objects, each object containing a section of objects
    return Object.keys(sectionKeyValueMap).map(key => ({ name: key, items: sectionKeyValueMap[key] }));
  }

}
