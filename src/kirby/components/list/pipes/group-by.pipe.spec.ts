import { GroupByPipe } from './group-by.pipe';

describe('Pipe: GroupBy', () => {

  it('create an instance', () => {
    const pipe = new GroupByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return collection if no callback is given', () => {
    const pipe = new GroupByPipe();
    const collection = [1, 2, 3];

    const result = pipe.transform(collection);

    expect(result).toEqual(collection);
  });

  it('should section the list correctly', () => {
      const callback = (item: any) => {
        return item.property;
      };
      const collection = [
        {
          property: 'section 1',
          dummyValue: 1
        },
        {
          property: 'section 2',
          dummyValue: 2
        },
        {
          property: 'section 3',
          dummyValue: 3
        }
      ];
      const pipe = new GroupByPipe();

      const result = pipe.transform(collection, callback);

      expect(result.length).toBe(3);
      result.forEach((section: any, index: number) => {
        expect(section.items.length).toBe(1);
        expect(section.items[0]).toEqual(collection[index]);
      });
  });
});
