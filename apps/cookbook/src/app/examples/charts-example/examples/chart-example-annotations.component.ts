import { Component } from '@angular/core';
import { AnnotationOptions } from 'chartjs-plugin-annotation';
import { ChartsModule } from '@kirbydesign/designsystem/chart';

const config = {
  selector: 'cookbook-chart-example-annotations',
  template: `<kirby-chart 
    [data]="[7, 12, 5, 9, 3]" 
    [annotations]="annotations"
  ></kirby-chart>`,
  codeSnippet: `annotations: AnnotationOptions[] = [
  {
    type: 'line',
    yMin: 6.5,
    yMax: 6.5,
    drawTime: 'beforeDatasetsDraw',
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
    xMin: 1.7,
    xMax: 1.8,
    yMin: 5.5,
    yMax: 4.5,
  },
  {
    type: 'line',
    yMin: 14.5,
    yMax: 14.5,
    borderDash: [0, 0],
  },
];
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ChartsModule],
})
export class ChartExampleAnnotationsComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  annotations: AnnotationOptions[] = [
    {
      type: 'line',
      yMin: 6.5,
      yMax: 6.5,
      drawTime: 'beforeDatasetsDraw',
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
      xMin: 1.7,
      xMax: 1.8,
      yMin: 5.5,
      yMax: 4.5,
    },
    {
      type: 'line',
      yMin: 14.5,
      yMax: 14.5,
      borderDash: [0, 0],
    },
  ];
}
