import { Component } from '@angular/core';
import { ScatterDataPoint } from 'chart.js';

import { ChartDataLabelOptions, ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock-comparison',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="_datasets"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-chart>
  `,
  codeSnippet: `
  _dataLabelOptions: ChartDataLabelOptions = {
    locale: 'da-DK',
    valueSuffix: '%',
  };
  
  _datasets = [
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 49.6 },
        { x: 1628639999000, y: 49.6 },
        { x: 1628726399000, y: 49.6 },
        { x: 1628899199000, y: 50 },
        { x: 1629158399000, y: 50 },
        { x: 1629244799000, y: 50 },
        { x: 1629331199000, y: 49.8 },
        { x: 1629417599000, y: 51.5 },
        { x: 1629503999000, y: 51.5 },
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 69.6 },
        { x: 1628639999000, y: 39.6 },
        { x: 1628726399000, y: 69.6 },
        { x: 1628899199000, y: 30 },
        { x: 1629158399000, y: 60 },
        { x: 1629244799000, y: 30 },
        { x: 1629331199000, y: 59.8 },
        { x: 1629417599000, y: 81.5 },
        { x: 1629503999000, y: 81.5 },
      ],
      borderColor: getThemeColorHexString('primary'),
    },
    {
      data: [
        { x: 1628294399000, y: 49.8 },
        { x: 1628553599000, y: 59.6 },
        { x: 1628639999000, y: 69.6 },
        { x: 1628726399000, y: -49.6 },
        { x: 1628899199000, y: 50 },
        { x: 1629158399000, y: 150 },
        { x: 1629244799000, y: 150 },
        { x: 1629331199000, y: 149.8 },
        { x: 1629417599000, y: 151.5 },
        { x: 1629503999000, y: 151.5 },
      ],
      borderColor: getThemeColorHexString('semi-dark'),
    },
  ];
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComparisonComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  _text: string;

  _dataLabelOptions: ChartDataLabelOptions = {
    locale: 'da-DK',
    valueSuffix: '%',
  };

  _datasets = [
    {
      data: this.getDataForStockChart(1),
      borderColor: getThemeColorHexString('secondary'),
    },
    {
      data: this.getDataForStockChart(2),
      borderColor: getThemeColorHexString('primary'),
    },
    {
      data: this.getDataForStockChart(3),
      borderColor: getThemeColorHexString('semi-dark'),
    },
  ];
  getDataForStockChart(id: number): ScatterDataPoint[] {
    return [
      { x: 1483372740000, y: 105.7969 },
      { x: 1483978800000, y: 106.557 },
      { x: 1484582340000, y: 107.2749 },
      { x: 1484927940000, y: 107.9 },
      { x: 1493305140000, y: 101.2 },
      { x: 1493738400000, y: 104.5831 },
      { x: 1494343200000, y: 104.3 },
      { x: 1499785140000, y: 105.1 },
      { x: 1503415200000, y: 105.7 },
      { x: 1504020000000, y: 105.6045 },
      { x: 1504552800000, y: 105.1 },
      { x: 1507317600000, y: 105.6 },
      { x: 1508181600000, y: 107.1 },
      { x: 1515687600000, y: 106.7653 },
      { x: 1516033200000, y: 107.1848 },
      { x: 1516638000000, y: 107 },
      { x: 1517242800000, y: 106.8 },
      { x: 1517847600000, y: 92.9 },
      { x: 1518538800000, y: 92.0654 },
      { x: 1519057200000, y: 92.392 },
      { x: 1520007600000, y: 92.45 },
      { x: 1520266800000, y: 92.35 },
      { x: 1521044400000, y: 92.95 },
      { x: 1521735600000, y: 92.65 },
      { x: 1522092000000, y: 92.4 },
      { x: 1526656800000, y: 92 },
      { x: 1538666400000, y: 91.92 },
      { x: 1539271200000, y: 91.76 },
      { x: 1539631200000, y: 91.76 },
      { x: 1540236000000, y: 91.4 },
      { x: 1540408800000, y: 91.18 },
      { x: 1548274800000, y: 91.54 },
      { x: 1550161200000, y: 91.76 },
      { x: 1551370800000, y: 91.76 },
      { x: 1555096800000, y: 91.76 },
      { x: 1556205600000, y: 91.76 },
      { x: 1557847200000, y: 91.7534 },
      { x: 1558725600000, y: 91.72 },
      { x: 1561648800000, y: 91.72 },
      { x: 1562858400000, y: 91.72 },
      { x: 1564068000000, y: 91.7018 },
      { x: 1569511200000, y: 96.88 },
      { x: 1600356000000, y: 98 },
      { x: 1601306400000, y: 96.625 },
      { x: 1603751400000, y: 97.6725 },
      { x: 1605565800000, y: 99.789 },
      { x: 1612477800000, y: 101.2 },
      { x: 1637684400000, y: 96.58 },
    ].map((point) => {
      const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      if (id === 2 && point.y < 100) {
        point.y = random(point.y - 1, point.y + 3);
      }
      if (id === 3 && point.y > 70) {
        point.y = random(point.y - 3, point.y + 1);
      }

      return point;
    });
  }
}
