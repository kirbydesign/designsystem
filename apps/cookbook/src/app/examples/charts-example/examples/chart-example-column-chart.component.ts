import { Component } from '@angular/core';
import { ChartsModule } from '@kirbydesign/designsystem/chart';

const config = {
  selector: 'cookbook-chart-example-column',
  template: `<kirby-chart type="column" [data]="data" [labels]="labels"></kirby-chart>`,
  codeSnippet: `data=[7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];

labels=['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ChartsModule],
})
export class ChartExampleColumnComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  data = [7, 12, 5, 9, 3, 11, 6, 2, 1, 10, 4, 12];
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
