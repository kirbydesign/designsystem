import { Component } from '@angular/core';
import { AnnotationOptions } from 'chartjs-plugin-annotation';

const config = {
  selector: 'cookbook-chart-wip-example-annotations',
  template: `<kirby-chart-wip 
    [data]="[7, 12, 5, 9, 3]" 
    [annotations]="annotations"
  ></kirby-chart-wip>`,
  codeSnippet: `annotations = [
    { 
      type: 'line', 
      yMin: 5, 
      yMax: 0 
      borderDash: [0, 0] 
      drawTime: 'beforeDatasetsDraw', 
    },
    { 
      type: 'line', 
      yMin: 0, 
      yMax: 5, 
    },
    { 
      type: 'box', 
      xMin: -0.3, 
      xMax: 0.3, 
      yMin: 6, 
      yMax: 9 
    },
    { 
      type: 'ellipse', 
      xMin: 1.5, 
      xMax: 2, 
      yMin: 3, 
      yMax: 10 
    }
  ];`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartWipExampleAnnotationsComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  annotations: AnnotationOptions[] = [
    {
      type: 'line',
      yMin: 0,
      yMax: 5,
    },
    {
      type: 'box',
      xMin: -0.3,
      xMax: 0.3,
      yMin: 6,
      yMax: 9,
    },
    {
      type: 'ellipse',
      xMin: 1.5,
      xMax: 2,
      yMin: 3,
      yMax: 10,
    },
    {
      type: 'line',
      yMin: 5,
      yMax: 0,
      drawTime: 'beforeDatasetsDraw',
      borderDash: [0, 0],
    },
  ];
}
