export class StringSearchHelper {
  static getIndexByFirstMatchingStartString(
    searchString: string,
    words: string[],
    startIndex: number
  ): number {
    searchString = searchString.toLowerCase();

    const wordsStartingWithMatchString = words
      .map((word, index) => {
        return { word: word.toLowerCase(), index };
      })
      .filter((match) => match.word.startsWith(searchString));

    if (wordsStartingWithMatchString.length === 0) {
      return -1;
    }

    const firstWordStartingWithChar = wordsStartingWithMatchString[0];
    const nextWordStartingWithChar = wordsStartingWithMatchString.find(
      (wordAndIndex) => wordAndIndex.index >= startIndex
    );

    return nextWordStartingWithChar?.index ?? firstWordStartingWithChar.index;
  }

  static isPrintableCharacter(key: string): boolean {
    return key.length === 1 && /\S/.test(key);
  }
}
