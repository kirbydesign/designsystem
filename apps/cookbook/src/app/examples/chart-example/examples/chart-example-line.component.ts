import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-line',
  template: `<kirby-chart [type]="'line'" [data]="[50, 200, 83, 102]"></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLineComponent {
  template: string = config.template;
}
