import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-bar-3',
  template: `<kirby-card>
  <kirby-card-header title="Bar"></kirby-card-header>
  <kirby-chart-2 
    type="bar"
    label="Bar"
    [categories]="['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb']"   
    [data]="[1000, 1100, 450, 1350, 1200, 10, 1400, 300, 500, 100,  1250, 600]"
    [backgroundColor]="['rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 255, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 255, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
          ]"

    [borderWidth]="1"
    [borderColor]="red"   
    [height]="height"   
    >
  </kirby-chart-2>
 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleBar3Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 450;
}
