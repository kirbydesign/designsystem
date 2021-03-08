import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-doughnut-1',
  template: `<kirby-card>
  <kirby-card-header title="Doughnut"></kirby-card-header>
  <kirby-chart-2 
    type="doughnut"
    [categories]="['Boomerangs 25%', 'Bubbles 41%', 'Jumping 33%', 'Christmas < 1%']"   
    [data]="[25, 41, 33, 1]"    
    [backgroundColor]="['#015132', '#B2D1BF', '#AABC08', '#1FA05A']"
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
export class ChartExampleDoughnut1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  options: ChartConfiguration = {
    options: {
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: true,
        text: 'A nice Doughnut',
      },
    },
  };
}
