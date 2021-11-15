import { Component } from '@angular/core';

import { ChartOptions, ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-stock',
  template: `
  <kirby-chart 
  type="stock" 
  [data]="data"
  [customOptions]="customOptions"
  [tooltipOptions]="toolTipOptions"
  ></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleStockComponent {
  template: string = config.template;

  toolTipOptions = {
    showMin: true,
    showMax: true,
    showCurrent: true,
  };

  customOptions: ChartOptions = {
    plugins: {
      tooltip: {
        // Hover labels,
        mode: 'index',
        intersect: true,
        caretSize: 1,
        caretPadding: 12,
        cornerRadius: 2,
        displayColors: false,
        backgroundColor: 'red',
        padding: 8,
        titleFont: {
          weight: 'normal',
          size: 12,
        },
        bodyFont: {
          size: 15,
          weight: 'bold',
        },
        callbacks: {
          title: (context): string => 'hej',
        },
      },
    },
  };

  stock1 = [
    {
      x: 1628294399000,
      y: 49.8,
      id: '',
    },
    {
      x: 1628553599000,
      y: 49.6,
      id: 'min',
    },
    {
      x: 1628639999000,
      y: 49.6,
      id: '',
    },
    {
      x: 1628726399000,
      y: 49.6,
      id: '',
    },
    {
      x: 1628899199000,
      y: 50,
      id: '',
    },
    {
      x: 1629158399000,
      y: 50,
      id: '',
    },
    {
      x: 1629244799000,
      y: 50,
      id: '',
    },
    {
      x: 1629331199000,
      y: 49.8,
      id: '',
    },
    {
      x: 1629417599000,
      y: 51.5,
      id: '',
    },
    {
      x: 1629503999000,
      y: 51.5,
      id: '',
    },
    {
      x: 1629763199000,
      y: 52,
      id: '',
    },
    {
      x: 1629849599000,
      y: 52,
      id: '',
    },
    {
      x: 1629935999000,
      y: 52,
      id: '',
    },
    {
      x: 1630108799000,
      y: 52,
      id: '',
    },
    {
      x: 1630367999000,
      y: 51,
      id: '',
    },
    {
      x: 1630540799000,
      y: 51,
      id: '',
    },
    {
      x: 1630713599000,
      y: 52,
      id: '',
    },
    {
      x: 1630972799000,
      y: 52,
      id: '',
    },
    {
      x: 1631145599000,
      y: 52,
      id: '',
    },
    {
      x: 1631231999000,
      y: 50,
      id: '',
    },
    {
      x: 1631318399000,
      y: 52,
      id: '',
    },
    {
      x: 1631577599000,
      y: 52,
      id: '',
    },
    {
      x: 1631663999000,
      y: 52,
      id: '',
    },
    {
      x: 1631750399000,
      y: 52,
      id: '',
    },
    {
      x: 1631836799000,
      y: 52,
      id: '',
    },
    {
      x: 1631923199000,
      y: 52,
      id: '',
    },
    {
      x: 1632182399000,
      y: 52,
      id: '',
    },
    {
      x: 1632268799000,
      y: 52,
      id: '',
    },
    {
      x: 1632787199000,
      y: 52,
      id: '',
    },
    {
      x: 1632959999000,
      y: 52,
      id: '',
    },
    {
      x: 1633132799000,
      y: 55,
      id: '',
    },
    {
      x: 1633391999000,
      y: 55,
      id: '',
    },
    {
      x: 1633564799000,
      y: 54,
      id: '',
    },
    {
      x: 1633651199000,
      y: 54,
      id: '',
    },
    {
      x: 1633737599000,
      y: 54,
      id: '',
    },
    {
      x: 1633996799000,
      y: 54,
      id: '',
    },
    {
      x: 1634169599000,
      y: 54,
      id: '',
    },
    {
      x: 1634255999000,
      y: 52.5,
      id: '',
    },
    {
      x: 1634601599000,
      y: 54,
      id: '',
    },
    {
      x: 1634687999000,
      y: 54,
      id: '',
    },
    {
      x: 1634774399000,
      y: 54,
      id: '',
    },
    {
      x: 1634860799000,
      y: 54,
      id: '',
    },
    {
      x: 1635206399000,
      y: 54,
      id: '',
    },
    {
      x: 1635465599000,
      y: 54,
      id: '',
    },
    {
      x: 1635811199000,
      y: 56,
      id: 'max',
    },
    {
      x: 1635897599000,
      y: 56,
      id: '',
    },
    {
      x: 1636070399000,
      y: 55,
      id: '',
    },
    {
      x: 1636113274000,
      y: 53.5,
      id: '',
    },
  ];

  stock2 = JSON.parse(JSON.stringify(this.stock1)).map((point) => {
    point.y = Math.floor(Math.random() * 5) + 50;
    return point;
  });
  stock3 = JSON.parse(JSON.stringify(this.stock1))
    .map((point) => {
      point.y = Math.floor(Math.random() * 5) + 50;
      return point;
    })
    // exclude a few points.
    .filter((point) => ![1631577599000, 1632787199000].includes(point.x));

  data = [
    {
      label: 'stock1',
      data: this.stock1,
    },
    {
      label: 'stock2',
      data: this.stock2,
      borderColor: getThemeColorHexString('primary'),
    },
    {
      label: 'stock3',
      data: this.stock3,
      borderColor: getThemeColorHexString('semi-dark'),
    },
  ];
}
