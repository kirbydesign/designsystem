import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-line-1',
  template: `<kirby-card>
  <kirby-card-header title="Line"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    [data]="data"
    [backgroundColor]="red"
    >
  </kirby-chart-2>
 
</kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLine1Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  height = 150;

  data = [
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
  ];
}
