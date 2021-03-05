import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-pie-1',
  template: `<kirby-card>
  <kirby-card-header title="Pie"></kirby-card-header>
  <kirby-chart-2 
    type="pie"
    [categories]="['Boomerangs 25%', 'Bubbles 41%', 'Jumping 33%', 'Christmas < 1%']"   
    [data]="[25, 41, 33, 1]"
   
    [backgroundColor]="[
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
          ]"

    [borderWidth]="1"
   [options]="options"
    >
  </kirby-chart-2>
 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExamplePie1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  options: ChartConfiguration = {
    options: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'A nice Pie',
      },
    },
  };
}
