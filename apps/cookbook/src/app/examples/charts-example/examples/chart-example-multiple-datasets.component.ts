import { Component } from '@angular/core';

import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { ChartsModule } from '@kirbydesign/designsystem/chart';

const { getThemeColorHexString } = ColorHelper;

const config = {
  selector: 'cookbook-chart-example-multiple-datasets',
  template: `<kirby-chart 
  type="column" 
  [data]="_datasets" 
  [labels]="['Monday', 'Tuesday', ['Wednes-','day'], 'Thursday', 'Friday']">
</kirby-chart>`,
  codeSnippet: `import { ColorHelper } from '@kirbydesign/designsystem/helpers';

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
    backgroundColor: getThemeColorHexString('primary'),
  },
];
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ChartsModule],
})
export class ChartExampleMultipleDatasetsComponent {
  template: string = config.template;

  codeSnippet = config.codeSnippet;

  _datasets = [
    {
      data: [30, 50, 89.5, 22, 48],
    },
    {
      data: [60, 32, 38, 44, 12],
      backgroundColor: getThemeColorHexString('primary'),
    },
    {
      type: 'line',
      data: [45, 65, 105, 37, 70],
    },
  ];
}
