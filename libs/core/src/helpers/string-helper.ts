export const kebabToCamelCase = (kebabString: string) => {
  if (!kebabString.length || kebabString.length === 1) {
    return kebabString;
  }
  const stringInCamelCase = kebabString
    .split('-')
    .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.substr(1)))
    .join('');
  return stringInCamelCase;
};

export const camelToKebabCase = (camelString: string) => {
  if (!camelString.length || camelString.length === 1) {
    return camelString;
  }
  const stringInKebabCase = camelString
    .split('')
    .map((char, index) => {
      const isUppercase = char.toUpperCase() === char;
      if (!isUppercase || char === '-') {
        return char;
      }
      return index === 0 ? char.toLowerCase() : `-${char.toLowerCase()}`;
    })
    .join('');
  return stringInKebabCase;
};

export const kebabToTitleCase = (kebabString: string) => {
  if (!kebabString.length || kebabString.length === 1) {
    return kebabString;
  }
  const stringInTitleCase = kebabString
    .split('-')
    .map((word: string) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');

  return stringInTitleCase;
};

export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};
