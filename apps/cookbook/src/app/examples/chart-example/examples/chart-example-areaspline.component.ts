import { Component } from '@angular/core';

import { Example } from '../../example.interface';

const config = {
  selector: 'cookbook-chart-example-areaspline',
  template: `
    <kirby-card>
        <kirby-card-header title="Areaspline"></kirby-card-header>
        <kirby-chart
            [height]="240"
            type="areaspline"
            description="Accessibility description goes here"
            [data]="data"
        >
            <!-- data = [1600.90, 1710.50, 1060.40, 1290.20, 1440.00, 1460.00, 1350.60, 1480.50, 1800.40, 1940.10, 1950.60, 1700.40, 1600.90, 1710.50, 1060.40, 1290.20, 1440.00, 1460.00, 1350.60, 1480.50, 1800.40, 1940.10, 1950.60, 1700.40] -->
        </kirby-chart>
        <kirby-card-footer>
            <!-- example period selector -->
            <div>
            <span (click)="data = [200, 100, 300, 100, 200, 300, 200]">Jan </span>
            <span (click)="data = [100, 100, 100, 400, 200, 200, 200]">Feb </span>
            <span (click)="data = [500, 400, 300, 200, 100, 200, 300]">Mar </span>
            </div>
        </kirby-card-footer>
    </kirby-card>
  `,
};
@Component(config)
export class ChartExampleAreasplineComponent implements Example {
  template = config.template;

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
