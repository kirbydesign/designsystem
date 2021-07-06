import { Component } from '@angular/core';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

const config = {
  selector: 'cookbook-chart-wip-example-simple-column',
  template: `<kirby-chart-wip [data]="[50, 200, 83, 102]" [annotations]="annotations"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleSimpleColumnComponent {
  template: string = config.template;
  annotations: AnnotationOptions[] = [
    {
      type: 'line',
      yMin: 95,
      yMax: 95,
    },
  ];
}
