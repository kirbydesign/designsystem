import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-doughnut-1',
  template: `<kirby-card>
  <kirby-card-header title="Doughnut"></kirby-card-header>
  <kirby-chart-2 
    type="doughnut"
    [categories]="['Boomerangs 25%', 'Bubbles 41%', 'Jumping 33%', 'Christmas < 1%']"   
    [data]="[25, 41, 33, 1]"
    
    [backgroundColor]="[
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
          ]"
 
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
  height = 150;
}
