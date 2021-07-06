import { all as deepMergeAll, Options as deepMergeOptions } from 'deepmerge';

export function deepMergeObjects(...objects: any[]) {
  const overwriteMerge = (_target: any[], source: any[], _options: deepMergeOptions) => source;
  const deepMergeOptions: deepMergeOptions = {
    arrayMerge: overwriteMerge,
  };

  const objectsWithoutUndefined = objects.filter((object) => object !== undefined);

  return deepMergeAll([{}, ...objectsWithoutUndefined], deepMergeOptions);
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
