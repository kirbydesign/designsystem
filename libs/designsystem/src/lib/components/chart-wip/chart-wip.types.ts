export enum ChartType {
  column = 'column',
  bar = 'bar',
}

export function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}
