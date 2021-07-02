import { all as deepMergeAll } from 'deepmerge';

export function deepMergeObjects(...objects: any[]) {
  // Deepmerge will mutate objects; add all updates to blank object
  return deepMergeAll([{}, ...objects.map((object) => ({ ...object }))]);
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
