import { ScatterDataPoint } from 'chart.js';

export class ChartConfigExample {
  static demoData: ScatterDataPoint[] = [
    { x: 1637049659000, y: 127.15 },
    { x: 1637049662000, y: 127.15 },
    { x: 1637049760000, y: 127.08 },
    { x: 1637049926000, y: 127.08 },
    { x: 1637050490000, y: 126.93 },
    { x: 1637050637000, y: 127.25 },
    { x: 1637050736000, y: 127.08 },
    { x: 1637050797000, y: 127.03 },
    { x: 1637050923000, y: 127.03 },
    { x: 1637051160000, y: 127.08 },
  ];

  static get demoDataString() {
    const demoDataString = JSON.stringify(ChartConfigExample.demoData)
      .split('[')
      .reduce((prev, current) => prev + current)
      .split(']')
      .reduce((prev, current) => prev + current)
      .split('},')
      .map((val, index, arr) => (index !== arr.length - 1 ? val + '},\n' : val))
      .map((val) => ' ' + val)
      .reduce((current, prev) => current + prev);

    return `demoData: ScatterDataPoint[] = [ \n${demoDataString}\n]`;
  }
}
