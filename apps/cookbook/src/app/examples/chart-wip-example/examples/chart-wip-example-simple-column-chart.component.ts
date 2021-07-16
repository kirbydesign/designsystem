import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-simple-column',
  template: `<kirby-chart [data]="[50, 200, 83, 102]"></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleSimpleColumnComponent {
  template: string = config.template;
}
