import _deepCopy from 'ts-deepcopy';

/**
 * Do a deep copy of object that supports the composite data type Function
 *
 * @see https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript#answer-122704
 *
 * @param obj
 * @returns obj
 */
export function deepCopy<T>(obj: T): T {
  return _deepCopy<T>(obj);
}
