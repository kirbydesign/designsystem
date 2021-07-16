import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-simple-column',
  template: `<kirby-chart [data]="[50, 200, 83, 102]"></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleSimpleColumnComponent {
  template: string = config.template;
}
