import { Component } from '@angular/core';

import { Example } from '../../example.interface';

const config = {
  selector: 'cookbook-chart-example-pie',
  template: `
    <kirby-card>
        <kirby-card-header [title]="'Pie'"></kirby-card-header>
        <kirby-chart
            [height]="320"
            [type]="'pie'"
            [showDataLabels]="false"
            [description]="'Accessibility description goes here'"
            [data]="[
            {
                name: 'Boomerangs 25%',
                y: 25,
                label: '25%'
            },
            {
                name: 'Bubbles 41%',
                y: 41,
                label: '41%'
            },
            {
                name: 'Jumping 33%',
                y: 33,
                label: '33%'
            },
            {
                name: 'Christmas < 1%',
                y: 1,
                label: '< 1%'
            }
            ]"
        ></kirby-chart>
    </kirby-card>
  `,
};
@Component(config)
export class ChartExamplePieComponent implements Example {
  template = config.template;
}
