import { mergeDeep } from './merge-deep';

describe('mergeDeep', () => {
  it('should deep merge provided objects, right into left', () => {
    const combinedRes = mergeDeep(
      { a: { a: 'will be overridden' }, b: 'will be overridden' },
      { a: { a: 'new val' }, b: 'new val' }
    );
    expect(combinedRes).toEqual({ a: { a: 'new val' }, b: 'new val' });
  });
});
