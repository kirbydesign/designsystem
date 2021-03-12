import { Component, Input, Output } from '@angular/core';
import { ChartConfiguration, ChartDataSets } from 'chart.js';

const config = {
  selector: 'cookbook-chart-example-line-2',
  template: `<kirby-card>
  <kirby-card-header title="Line - 2"></kirby-card-header>
  <kirby-chart-2 
    type="line"
    label="Milk price"
    [labels]="labels"
    [height]="height"
    [data]="data"   
    [options]="lineOptions"
    [backgroundColor]="color"
    >
  </kirby-chart-2>
 </kirby-card>`,

  codeSnippet: ``,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleLine2Component {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  height = 250;
  color: string[] = ['red'];

  lineOptions: ChartConfiguration = {
    options: {
      elements: {
        line: {
          fill: false,
        },
        point: {
          radius: 5,
          hoverRadius: 8,
          hoverBorderWidth: 1,
        },
      },
    },
  };
  label: 'the label';
  labels: string[] = [
    'January 2010',
    'February 2010',
    'March 2010',
    'April 2010',
    'May 2010',
    'June 2010',
    'January 2011',
    'February 2011',
    'March 2011',
    'April 2011',
    'May 2011',
    'June 2011',
    'January 2012',
    'February 2012',
    'March 2012',
    'April 2012',
    'May 2012',
    'June 2012',
    'January 2013',
    'February 2013',
    'March 2013',
    'April 2013',
    'May 2013',
    'June 2013',
  ];

  data: number[] = [
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
