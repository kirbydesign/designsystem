import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-activity-gauge',
  template: `<kirby-card>
  <kirby-card-header title="Activity-Gauge"> </kirby-card-header>
  <div
    style="background: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80') no-repeat fixed center;"
  >
  <kirby-chart
    [height]="258"
    type="activitygauge"
    [showDataLabels]="false"
    description="Accessibility description goes here"
    [data]="[
    {
      title: '1.234.567',
      subtitle: 'Afdraget',
      series: [
      {
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [1, '#00e89a'],
            [0, '#00a76f']
          ]
        },
        radius: '112%',
        innerRadius: '88%',
        y: 25
        }
      ]
    }
    ]"
  ></kirby-chart>
  </div>
</kirby-card>`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleActivityGaugeComponent {
  template = config.template;
}
