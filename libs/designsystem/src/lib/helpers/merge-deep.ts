/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable).
 * It merges from into object to the left
 *  eg. mergeDeep({a: 'will be overridden', b: 'some val'}, {a: 'new val'}) =>  {a: 'new val', b: 'some val'}
 *
 * @param originalObject object - Object to override,
 * @param overrideObject object - Object to override "toOverride" values with
 * @param config object - Configuration for how to merge.
 *  mergeArrays determines if it should merge or override arrays
 * @returns object - New object with merged key/values
 */
export function mergeDeep(originalObject, overrideObject, config = { mergeArrays: false }) {
  const isObject = (obj) => obj && typeof obj === 'object';

  return [originalObject, overrideObject].reduce((mergedObject, obj) => {
    Object.keys(obj).forEach((key) => {
      const mergedObjectValue = mergedObject[key];
      const overrideObjectValue = obj[key];

      if (Array.isArray(mergedObjectValue) && Array.isArray(overrideObjectValue)) {
        mergedObject[key] = config.mergeArrays
          ? mergedObjectValue.concat(overrideObjectValue)
          : overrideObjectValue;
      } else if (isObject(mergedObjectValue) && isObject(overrideObjectValue)) {
        mergedObject[key] = mergeDeep(mergedObjectValue, overrideObjectValue);
      } else {
        mergedObject[key] = overrideObjectValue;
      }
    });

    return mergedObject;
  }, {});
}

export function mergeDeepAll(...objects: object[]): object {
  const objectsWithoutUndefined = objects.filter((object) => object !== undefined);
  return objectsWithoutUndefined.reduce((originalObject, overrideObject) =>
    mergeDeep(originalObject, overrideObject)
  );
}
