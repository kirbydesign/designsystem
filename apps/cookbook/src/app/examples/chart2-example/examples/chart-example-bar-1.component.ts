import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-bar-1',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>
  <kirby-chart-2 
    type="bar"
    label="Bar"
    [height]="height"
    [categories]="['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb']"   
    [data]="[0, 1400, 300, 500, 100, 1000, 1100, 450, 1350, 1200, 1250, 600]"
    >
  </kirby-chart-2>
 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleBar1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 275;
}
