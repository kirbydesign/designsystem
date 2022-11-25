import { ScatterDataPoint } from 'chart.js';
import { StockChartConfig } from './chart-stock-config';

describe('StockChartConfig', () => {
  beforeEach(() => {
    StockChartConfig.registerPlugins();
  });

  describe('DataLabel min & max values', () => {
    const data: ScatterDataPoint[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];

    it(`should return label position 'bottom' when dataIndex is '0'`, () => {
      const res = StockChartConfig.getDataLabelPosition(data, 0);

      expect(res).toBe('bottom');
    });

    it(`should return label position 'null' when dataIndex is '1'`, () => {
      const res = StockChartConfig.getDataLabelPosition(data, 1);

      expect(res).toBe(null);
    });

    it(`should return label position 'top' when dataIndex is '2'`, () => {
      const res = StockChartConfig.getDataLabelPosition(data, 2);

      expect(res).toBe('top');
    });
  });
});
