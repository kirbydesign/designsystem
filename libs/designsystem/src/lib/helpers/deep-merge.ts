/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable).
 * It merges from into object to the left
 *  eg. mergeDeep({a: 'will be overridden', b: 'some val'}, {a: 'new val'}) =>  {a: 'new val', b: 'some val'}
 *
 * @param toOverride object - Object to override,
 * @param overrides object - Object to override "toOverride" values with
 * @param config object - Configuration for how to merge.
 *  mergeArrays determines if it should merge or override arrays
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(toOverride, overrides, config = { mergeArrays: false }) {
  const isObject = (obj) => obj && typeof obj === 'object';

  return [toOverride, overrides].reduce((combinedObject, obj) => {
    Object.keys(obj).forEach((key) => {
      const combinedObjectValue = combinedObject[key];
      const currentObjectValue = obj[key];

      if (Array.isArray(combinedObjectValue) && Array.isArray(currentObjectValue)) {
        combinedObject[key] = config.mergeArrays
          ? combinedObjectValue.concat(currentObjectValue)
          : [...currentObjectValue];
      } else if (isObject(combinedObjectValue) && isObject(currentObjectValue)) {
        combinedObject[key] = mergeDeep(combinedObjectValue, currentObjectValue);
      } else {
        combinedObject[key] = currentObjectValue;
      }
    });

    return combinedObject;
  }, {});
}
