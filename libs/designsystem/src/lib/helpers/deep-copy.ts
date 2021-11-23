import _deepCopy from 'ts-deepcopy';

/**
 * Do a deep copy of object to remove references
 *
 * Do so while retaining functions.
 *
 * @param obj
 * @returns
 */
export function deepCopy(obj: any): any {
  return _deepCopy(obj);
}
