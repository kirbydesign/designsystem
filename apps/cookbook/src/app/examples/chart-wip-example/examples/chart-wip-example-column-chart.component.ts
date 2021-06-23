import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-column',
  template: `<kirby-chart-wip type="column" [data]="[7, 12, 5, 9, 3]" [dataLabels]="['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday']"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleColumnComponent {
  template: string = config.template;
}
