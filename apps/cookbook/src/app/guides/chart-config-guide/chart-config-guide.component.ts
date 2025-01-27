import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ChartConfigExample } from '../../examples/charts-example/examples/config/chart-config-example';
import { ChartExampleConfigBaseStockComponent } from '../../examples/charts-example/examples/config/stock-config/chart-example-config-base-stock.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-chart-config-guide',
  templateUrl: 'chart-config-guide.component.html',
  imports: [RouterLink, CardModule, ChartExampleConfigBaseStockComponent, CodeViewerComponent],
})
export class ChartConfigGuideComponent {
  public guideChartHtml = `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --></canvas>
</div>`;
  public demoDataExample = `private ${ChartConfigExample.demoDataString}`;
  public chartProperties = `private _chart: Chart;`;
  public createChartFunctionExample = `private _chart: Chart;
public ngOnDestroy(): void {
   this._chart.destroy();
 }

private createChart() {
   let config = StockChartConfig.baseConfig;

   config = {
     ...config,
     data: {
       datasets: [
         {
           data: this.demoData.map((demoDataEntry) => demoDataEntry),
         },
       ],
       labels: this.demoData.map((demoDataEntry) => demoDataEntry.x),
     },
   };
   this._chart = new Chart(this.canvasId, config);
 }`;

  public inintExample = `public ngAfterViewInit(): void {
    StockChartConfig.registerPlugins();
    this.createChart();\n}`;

  public destroyExample = `public ngOnDestroy(): void {
  this._chart.destroy();
}`;
}
