import { StringSearchHelper } from './string-search.helper';
describe('SearchHelper', () => {
  let words: string[];

  beforeEach(() => {
    words = ['apple', 'banana', 'bandana', 'cherry', 'blueberry'];
  });

  describe('Search through words', () => {
    it('returns -1 when no word starts with the search string', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('z', words, 0);
      expect(result).toBe(-1);
    });

    it('returns the index of the first matching word when startIndex is 0', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('ba', words, 0);
      expect(result).toBe(1);
    });

    it('returns the index of the next matching word after startIndex', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('ba', words, 2);
      expect(result).toBe(2);
    });

    it('returns the first matching index if none are after startIndex', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('ba', words, 5);
      expect(result).toBe(1);
    });

    it('is case-insensitive', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('Ba', words, 0);
      expect(result).toBe(1);
    });

    it('handles empty word list', () => {
      const result = StringSearchHelper.getIndexByFirstMatchingStartString('a', [], 0);
      expect(result).toBe(-1);
    });
  });

  describe('SearchHelper.isPrintableCharacter', () => {
    it('returns true for a single non-whitespace character', () => {
      expect(StringSearchHelper.isPrintableCharacter('a')).toBe(true);
      expect(StringSearchHelper.isPrintableCharacter('1')).toBe(true);
      expect(StringSearchHelper.isPrintableCharacter('@')).toBe(true);
    });

    it('returns false for whitespace characters', () => {
      expect(StringSearchHelper.isPrintableCharacter(' ')).toBe(false);
      expect(StringSearchHelper.isPrintableCharacter('\t')).toBe(false);
      expect(StringSearchHelper.isPrintableCharacter('\n')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(StringSearchHelper.isPrintableCharacter('')).toBe(false);
    });

    it('returns false for strings longer than one character', () => {
      expect(StringSearchHelper.isPrintableCharacter('ab')).toBe(false);
      expect(StringSearchHelper.isPrintableCharacter('12')).toBe(false);
    });
  });
});
