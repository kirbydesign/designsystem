import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-bar',
  template: `<kirby-chart-wip type="bar" [data]="[7, 12, 5, 9, 3]" [dataLabels]="['2021', '2020', '2019', '2018', '2017']"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleBarComponent {
  template: string = config.template;
}
