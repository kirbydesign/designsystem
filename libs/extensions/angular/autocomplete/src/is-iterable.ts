// https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable
/**
 * Checks if the given object is iterable.
 *
 * @example
 * ```ts
 * isIterable([1, 2, 3]); // true
 * ```
 *
 * @example
 * ```ts
 * function foo(arg: unknown) {
 *   if (isIterable(arg)) {
 *     for (const item of arg) {
 *       // arg can be iterated now
 *     }
 *   }
 * }
 */
export function isIterable<T>(obj: unknown): obj is unknown & Iterable<T> {
  // checks for null and undefined
  if (obj === null || obj === undefined) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (obj as any)[Symbol.iterator] === 'function';
}
