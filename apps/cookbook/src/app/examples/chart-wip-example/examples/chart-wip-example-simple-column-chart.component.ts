import { Component } from '@angular/core';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

const config = {
  selector: 'cookbook-chart-wip-example-simple-column',
  template: `<kirby-chart-wip [data]="[50, 200, 83, 102]" [customAnnotations]="customAnnotations"></kirby-chart-wip>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleSimpleColumnComponent {
  template: string = config.template;
  customAnnotations: AnnotationOptions[] = [
    {
      type: 'line',
      yMin: 60,
      yMax: 60,
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
    },
  ];
}
