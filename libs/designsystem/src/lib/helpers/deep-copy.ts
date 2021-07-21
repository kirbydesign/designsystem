export function deepCopy(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}
