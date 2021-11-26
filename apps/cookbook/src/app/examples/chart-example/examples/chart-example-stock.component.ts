import { Component } from '@angular/core';
import { ScatterDataPoint } from 'chart.js';

import { ChartDataLabelOptions, ColorHelper } from '@kirbydesign/designsystem';
const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="_dataset"
  [dataLabelOptions]="_dataLabelOptions"
  ></kirby-chart>
  `,
  codeSnippet: `
  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };
  
  _dataset = [
    {
      data: [
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
      ],
      borderColor: getThemeColorHexString('secondary'),
    },
  ];
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  _dataLabelOptions: ChartDataLabelOptions = {
    showMin: true,
    showMax: true,
  };

  _dataset = [
    {
      data: this.getDataForStockChart(),
      borderColor: getThemeColorHexString('secondary'),
    },
  ];

  getDataForStockChart(): ScatterDataPoint[] {
    return [
      { x: 1480953540000, y: 99.35 },
      { x: 1481558340000, y: 100.9886 },
      { x: 1482163140000, y: 101.1088 },
      { x: 1482940740000, y: 101.6553 },
      { x: 1483372740000, y: 100.2 },
      { x: 1483977540000, y: 101.8 },
      { x: 1484582340000, y: 102.0229 },
      { x: 1485273540000, y: 101.8 },
      { x: 1485791940000, y: 101.748 },
      { x: 1486483140000, y: 101.5536 },
      { x: 1487001540000, y: 102 },
      { x: 1487606340000, y: 101.3843 },
      { x: 1488211140000, y: 102.3428 },
      { x: 1488990000000, y: 102.7609 },
      { x: 1489420740000, y: 101 },
      { x: 1490025540000, y: 100.8514 },
      { x: 1490628000000, y: 101.2176 },
      { x: 1491231540000, y: 101.5 },
      { x: 1491836340000, y: 101.1 },
      { x: 1492613940000, y: 101.2 },
      { x: 1493045940000, y: 101.5 },
      { x: 1493737140000, y: 101.4 },
      { x: 1494256800000, y: 102.2099 },
      { x: 1494946740000, y: 102.2716 },
      { x: 1495465140000, y: 102.2721 },
      { x: 1496156340000, y: 102.1955 },
      { x: 1496762400000, y: 101.9 },
      { x: 1497279540000, y: 101.7836 },
      { x: 1499785140000, y: 101.6 },
      { x: 1503415200000, y: 101.7 },
      { x: 1504020000000, y: 101.7 },
      { x: 1504552800000, y: 102.2 },
      { x: 1507317600000, y: 102.5 },
      { x: 1508181600000, y: 102.2 },
      { x: 1515687600000, y: 102.2 },
      { x: 1516119600000, y: 102.3 },
      { x: 1516724400000, y: 102.2 },
      { x: 1516983600000, y: 102.8 },
      { x: 1517242800000, y: 102.3 },
      { x: 1518538800000, y: 101.4 },
      { x: 1519143600000, y: 101.5421 },
      { x: 1520266800000, y: 101.6 },
      { x: 1521044400000, y: 101.7 },
      { x: 1521735600000, y: 101.5 },
      { x: 1522092000000, y: 101.5 },
      { x: 1526656800000, y: 92.9076 },
      { x: 1538666400000, y: 93.54 },
      { x: 1539271200000, y: 93.4 },
      { x: 1539631200000, y: 93.4 },
      { x: 1540236000000, y: 93.08 },
      { x: 1544214000000, y: 93.4 },
      { x: 1546532400000, y: 93.4 },
      { x: 1546964400000, y: 93.42 },
      { x: 1548447600000, y: 92.68 },
      { x: 1549916400000, y: 93.3804 },
      { x: 1551298800000, y: 93.4 },
      { x: 1551903600000, y: 93.4 },
      { x: 1552407600000, y: 93.4 },
      { x: 1553890800000, y: 93.4 },
      { x: 1554823200000, y: 93.4182 },
      { x: 1555528800000, y: 93.42 },
      { x: 1558725600000, y: 93.42 },
      { x: 1559056800000, y: 93.5109 },
      { x: 1560266400000, y: 93.52 },
      { x: 1560972000000, y: 93.5396 },
    ];
  }
}
