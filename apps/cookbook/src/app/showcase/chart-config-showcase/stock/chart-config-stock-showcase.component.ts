import { Component } from '@angular/core';
import { ChartConfigExample } from '~/app/examples/charts-example/examples/config/chart-config-example';

@Component({
  selector: 'cookbook-chart-stock-config-showcase',
  templateUrl: './chart-config-stock-showcase.component.html',
})
export class CookbookChartStockConfigShowcaseComponent {
  public data = ChartConfigExample.demoDataString;
}
