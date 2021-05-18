import { ListItem } from '../list-item/list-item.component';

import { GroupByPipe } from './group-by.pipe';

describe('Pipe: GroupBy', () => {
  it('create an instance', () => {
    const pipe = new GroupByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return collection if no callback is given', () => {
    const pipe = new GroupByPipe();
    const collection = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const result = pipe.transform(collection);

    expect(result).toEqual(collection);
  });

  it('should section list by callback function', () => {
    const callback = (item: ListItem) => {
      return item.title;
    };
    const collection = [
      {
        title: 'section 1',
        value: 1,
      },
      {
        title: 'section 2',
        value: 2,
      },
      {
        title: 'section 3',
        value: 3,
      },
    ];
    const pipe = new GroupByPipe();

    const result = pipe.transform(collection, callback);

    expect(result.length).toBe(3);
    result.forEach((section: any, index: number) => {
      expect(section.items.length).toBe(1);
      expect(section.items[0]).toEqual(collection[index]);
    });
  });

  it('should order sections by alphabetical order', () => {
    const callback = (item: ListItem) => {
      return item.title;
    };
    const collection = [
      {
        title: 'section 202',
        value: 1,
      },
      {
        title: 'section 1',
        value: 2,
      },
      {
        title: 'section 44',
        value: 3,
      },
    ];
    const pipe = new GroupByPipe();
    const result = pipe.transform(collection, callback);
    expect(result[0].name).toEqual('section 1');
    expect(result[1].name).toEqual('section 202');
    expect(result[2].name).toEqual('section 44');
  });
});
