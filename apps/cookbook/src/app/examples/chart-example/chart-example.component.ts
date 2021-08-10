import { Component } from '@angular/core';

import { ChartOptions } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-chart-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss'],
})
export class ChartExampleComponent {
  _customOptions: ChartOptions = {
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  };
}
