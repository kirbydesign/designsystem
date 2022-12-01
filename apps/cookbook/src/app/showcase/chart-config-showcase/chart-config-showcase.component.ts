import { Component } from '@angular/core';
import { ChartConfigExample } from '~/app/examples/charts-example/examples/stock-config/chart-config-example';

@Component({
  selector: 'cookbook-chart-config-showcase',
  templateUrl: './chart-config-showcase.component.html',
})
export class CookbookChartConfigShowcaseComponent {
  public data = ChartConfigExample.demoDataString;
}
