import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-line',
  template: `
  <button (click)="onClick()">Swap type</button>
  <kirby-chart 
  [type]="_chartType" 
  [data]="[6, 6.37, 6.46, 6.64, 6.78, 7.44, 7.92, 8.18, 8.41, 8.85, 9.33]" 
  [dataLabels]='["1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960"]' 
  ></kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLineComponent {
  template: string = config.template;

  private types = ['line', 'bar'];
  get _chartType() {
    return this.types[0];
  }

  onClick() {
    this.types = this.types.reverse();
  }
}
