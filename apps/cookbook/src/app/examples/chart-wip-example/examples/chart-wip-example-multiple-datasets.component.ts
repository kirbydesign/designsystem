import { Component } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-wip-example-multiple-datasets',
  template: `<kirby-chart-wip 
  type="column" 
  [data]="_datasets" 
  [dataLabels]="['Monday', 'Tuesday', ['Wedens-','day'], 'Thursday', 'Friday']">
</kirby-chart-wip>`,
  codeSnippet: `import { ColorHelper } from '@kirbydesign/designsystem';

const { getThemeColorHexString } = ColorHelper;

_datasets = [
  {
    type: 'line',
    data: [45, 65, 105, 37, 70],
  },
  {
    data: [30, 50, 89.5, 22, 48],
  },
  {
    data: [60, 32, 38, 44, 12],
    backgroundColor: getThemeColorHexString('secondary-tint'),
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
      data: [60, 32, 38, 44, 12],
      backgroundColor: getThemeColorHexString('secondary-tint'),
    },
    {
      type: 'line',
      data: [45, 65, 105, 37, 70],
    },
  ];
}
