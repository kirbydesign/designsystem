import { StartStringMatch } from './start-string-match.helper';

describe('StartStringMatch', () => {
  it('should return the index of the first item that starts with the given character', () => {
    const items = ['apple', 'banana', 'cherry', 'date'];
    const char = 'b';
    const startIndex = 0;

    const result = StartStringMatch.getIndexByFirstMatchingStartString(char, items, startIndex);
    expect(result).toBe(1);
  });

  it('should return -1 if no item starts with the given character', () => {
    const items = ['apple', 'banana', 'cherry', 'date'];
    const char = 'z';
    const startIndex = 0;

    const result = StartStringMatch.getIndexByFirstMatchingStartString(char, items, startIndex);
    expect(result).toBe(-1);
  });
});
