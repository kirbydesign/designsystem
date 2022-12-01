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

  public static barDemoData: ScatterDataPoint[] = [
    { x: 1, y: 50 },
    { x: 2, y: 200 },
    { x: 3, y: 83 },
    { x: 4, y: 102 },
  ];

  public static get barDemoDataString() {
    return this.demoDataToString(ChartConfigExample.barDemoData);
  }

  public static get demoDataString() {
    return this.demoDataToString(ChartConfigExample.demoData);
  }

  private static demoDataToString = (data: ScatterDataPoint[]) => {
    let demoDataString = '';
    data.forEach((datapoint) => {
      demoDataString += `  { x: ${datapoint.x}, y: ${datapoint.y} },\n`;
    });

    return `demoData: ScatterDataPoint[] = [ \n${demoDataString}]`;
  };
}
