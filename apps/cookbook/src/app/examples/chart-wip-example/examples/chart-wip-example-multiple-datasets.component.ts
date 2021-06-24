import { Component } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-wip-example-multiple-datasets',
  template: `<kirby-chart-wip 
  type="bar" 
  [data]="_datasets" 
  [dataLabels]="['Monday', 'Tuesday', ['Wedens-','day'], 'Thursday', 'Friday']">
</kirby-chart-wip>`,
  codeSnippet: `import { ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

_datasets = [
  {
    data: [30, 50, 89.5, 22, 48],
  },
  {
    data: [68, 62, 101, 2.1, 38],
    backgroundColor: getThemeColorHexString('secondary-tint'),
  },
  {
    data: [125, 28, 32, 20, 69],
    backgroundColor: getThemeColorHexString('secondary-shade'),
  },
];
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleMultipleDatasetsComponent {
  template: string = config.template;

  codeSnippet = config.codeSnippet;

  _datasets = [
    {
      data: [30, 50, 89.5, 22, 48],
    },
    {
      data: [68, 62, 101, 2.1, 38],
      backgroundColor: getThemeColorHexString('secondary-tint'),
    },
    {
      data: [125, 28, 32, 20, 69],
      backgroundColor: getThemeColorHexString('secondary-shade'),
    },
  ];
}
