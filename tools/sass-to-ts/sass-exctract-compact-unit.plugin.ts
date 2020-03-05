class SassExctractCompactUnitPlugin {
  private isPrimitive(value: any) {
    return Object(value) !== value;
  }

  /**
   * Use duck typing to distinguish between map and color objects
   */
  private isColor(value: any) {
    return 'hex' in value;
  }

  private compactArray(arrayValue: Array<any>) {
    return arrayValue.map((element) => {
      return this.compactValue(element.value, element.unit);
    });
  }

  private compactObject(objectValue: any) {
    if (this.isColor(objectValue)) {
      return objectValue.hex;
    }

    const compactedObject = {};
    Object.keys(objectValue).forEach((key) => {
      const compactKey = this.sassKeyToCamelCase(key);
      const entry = objectValue[key];
      compactedObject[compactKey] = this.compactValue(entry.value, entry.unit);
    });

    return compactedObject;
  }

  private sassKeyToCamelCase(key: string) {
    return key
      .replace('$', '')
      .split('-')
      .map((part, index) => (index === 0 ? part : part[0].toUpperCase() + part.substr(1)))
      .join('');
  }

  compactValue(value: any, unit = '') {
    if (this.isPrimitive(value)) {
      return value + unit;
    } else if (Array.isArray(value)) {
      return this.compactArray(value);
    } else {
      return this.compactObject(value);
    }
  }
}

/**
 * Remove all metadata about variables and only output the variable value itself
 * Lists and maps are collapsed into their respective elements
 */
export function run() {
  const plugin = new SassExctractCompactUnitPlugin();
  return {
    postExtract: (extractedVariables: { global: { [key: string]: any } }) => {
      const compactedVariables = {
        global: plugin.compactValue(extractedVariables.global),
      };
      return compactedVariables;
    },
  };
}
