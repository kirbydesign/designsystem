import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-simple-column',
  template: `<kirby-chart-wip [data]="[50, 200, 83, 102]"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleSimpleColumnComponent {
  template: string = config.template;
}
