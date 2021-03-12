import { camelToKebabCase, kebabToCamelCase, kebabToTitleCase } from './string-helper';

const testStrings = ['', 'a', 'A', '9', '-', 'abc', 'ABC', 'kebabs-are-great', 'camelsLookWeird'];

describe('kebabToCamelCase', () => {
  it('should transform a kebab cased string to a camel cased', () => {
    const result = [];
    testStrings.forEach((tString) => {
      result.push(kebabToCamelCase(tString));
    });
    const expectedResult = [
      '',
      'a',
      'A',
      '9',
      '-',
      'abc',
      'ABC',
      'kebabsAreGreat',
      'camelsLookWeird',
    ];
    expect(result).toEqual(expectedResult);
  });
});

describe('kebabToTitleCase', () => {
  it('should transform a kebab cased string to a title cased', () => {
    const result = [];
    testStrings.forEach((tString) => {
      result.push(kebabToTitleCase(tString));
    });
    const expectedResult = [
      '',
      'a',
      'A',
      '9',
      '-',
      'Abc',
      'ABC',
      'Kebabs Are Great',
      'CamelsLookWeird',
    ];
    expect(result).toEqual(expectedResult);
  });
});

describe('camelToKebabCase', () => {
  it('should transform a camel cased string to a kebab cased', () => {
    const result = [];
    testStrings.forEach((tString) => {
      result.push(camelToKebabCase(tString));
    });
    const expectedResult = [
      '',
      'a',
      'A',
      '9',
      '-',
      'abc',
      'a-b-c',
      'kebabs-are-great',
      'camels-look-weird',
    ];
    expect(result).toEqual(expectedResult);
  });
});
