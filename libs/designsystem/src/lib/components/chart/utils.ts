import { mergeDeep } from '../../helpers/deep-merge';

export function deepMergeObjects(...objects: Object[]): Object {
  const objectsWithoutUndefined = objects.filter((object) => object !== undefined);
  return objectsWithoutUndefined.reduce((originalObject, overrideObject) =>
    mergeDeep(originalObject, overrideObject)
  );
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
