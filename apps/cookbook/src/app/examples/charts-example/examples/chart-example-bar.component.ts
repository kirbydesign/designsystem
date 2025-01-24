import { Component } from '@angular/core';
import { ChartsModule } from '@kirbydesign/designsystem/chart';

const config = {
  selector: 'cookbook-chart-example-bar',
  template: `<kirby-chart type="bar" [data]="[7, 12, 5, 9, 3]" [labels]="['2021', '2020', '2019', '2018', '2017']"></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ChartsModule],
})
export class ChartExampleBarComponent {
  template: string = config.template;
}
