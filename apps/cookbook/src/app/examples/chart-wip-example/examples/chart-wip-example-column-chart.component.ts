import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-wip-example-column',
  template: `<kirby-chart-wip type="column" [data]="data" [dataLabels]="dataLabels"></kirby-chart-wip>`,
  codeSnippet: `data=[7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

dataLabels=['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleColumnComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  data = [7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];
  dataLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
