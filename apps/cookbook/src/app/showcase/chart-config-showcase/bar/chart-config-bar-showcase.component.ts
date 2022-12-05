import { Component } from '@angular/core';
import { ChartConfigExample } from '~/app/examples/charts-example/examples/config/chart-config-example';

@Component({
  selector: 'cookbook-chart-stock-config-showcase',
  templateUrl: './chart-config-bar-showcase.component.html',
})
export class CookbookChartBarConfigShowcaseComponent {
  public data = ChartConfigExample.barDemoDataString;
}
