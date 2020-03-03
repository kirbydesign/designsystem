function isPrimitive(value) {
  return Object(value) !== value;
}

/**
 * Use duck typing to distinguish between map and color objects
 */
function isColor(value) {
  return (
    value.r != null && value.g != null && value.b != null && value.a != null && value.hex != null
  );
}

function compactArray(arrayValue) {
  return arrayValue.map((element) => {
    return compactValue(element.value, element.unit);
  });
}

function compactObject(objectValue) {
  if (isColor(objectValue)) {
    return objectValue;
  }

  const compactedObject = {};
  Object.keys(objectValue).forEach((key) => {
    const compactKey = sassKeyToCamelCase(key);
    const entry = objectValue[key];
    compactedObject[compactKey] = compactValue(entry.value, entry.unit);
  });

  return compactedObject;
}

function sassKeyToCamelCase(key: string) {
  return key
    .replace('$', '')
    .split('-')
    .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.substr(1)))
    .join('');
}

function compactValue(value, unit?) {
  if (isPrimitive(value)) {
    return unit
      ? {
          value,
          unit,
        }
      : {
          value,
        };
  } else if (Array.isArray(value)) {
    return compactArray(value);
  } else {
    return compactObject(value);
  }
}

/**
 * Remove all metadata about variables and only output the variable value itself
 * Lists and maps are collapsed into their respective elements
 */
export function run() {
  return {
    postExtract: (extractedVariables) => {
      const compactedVariables = {
        global: compactValue(extractedVariables.global),
      };
      // console.warn('extractedVariables', extractedVariables);

      return compactedVariables;
    },
  };
}
