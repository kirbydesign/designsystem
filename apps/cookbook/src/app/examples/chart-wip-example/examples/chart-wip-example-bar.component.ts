import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-bar',
  template: `<kirby-chart-wip type="bar" [data]="[7, 12, 5, 9, 3]" [dataLabels]="['Monday', 'Tuesday', ['Wedens-','day'], 'Thursday', 'Friday']"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleBarComponent {
  template: string = config.template;
}
