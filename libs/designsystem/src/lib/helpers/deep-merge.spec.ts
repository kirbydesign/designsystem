import { mergeDeep } from './deep-merge';

describe('mergeDeep', () => {
  it('should deep merge provided objects, right into left', () => {
    const combinedRes = mergeDeep({ a: 'will be overridden', b: 'some val' }, { a: 'new val' });
    expect(combinedRes).toEqual({ a: 'new val', b: 'some val' });
  });
});
