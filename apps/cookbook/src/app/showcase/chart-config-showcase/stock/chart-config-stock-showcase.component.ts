import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CodeViewerComponent } from '../../../shared/code-viewer/code-viewer.component';
import { ExampleViewerComponent } from '../../../shared/example-viewer/example-viewer.component';
import { ChartExampleConfigBaseStockComponent } from '../../../examples/charts-example/examples/config/stock-config/chart-example-config-base-stock.component';
import { ChartExampleConfigDatalabelsStockComponent } from '../../../examples/charts-example/examples/config/stock-config/chart-example-config-datalabels-stock.component';
import { ChartExampleConfigTooltipStockComponent } from '../../../examples/charts-example/examples/config/stock-config/chart-example-config-tooltip-stock.component';
import { ChartExampleConfigStockComponent } from '../../../examples/charts-example/examples/config/stock-config/chart-example-config-stock.component';
import { ChartConfigExample } from '~/app/examples/charts-example/examples/config/chart-config-example';

@Component({
  selector: 'cookbook-chart-stock-config-showcase',
  templateUrl: './chart-config-stock-showcase.component.html',
  imports: [
    RouterLink,
    CodeViewerComponent,
    CardModule,
    ExampleViewerComponent,
    ChartExampleConfigBaseStockComponent,
    ChartExampleConfigDatalabelsStockComponent,
    ChartExampleConfigTooltipStockComponent,
    ChartExampleConfigStockComponent,
  ],
})
export class CookbookChartStockConfigShowcaseComponent {
  public data = ChartConfigExample.demoDataString;
}
