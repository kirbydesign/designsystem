import { Component } from '@angular/core';
import { ChartConfigExample } from '../../examples/charts-example/examples/stock-config/chart-config-example';

@Component({
  selector: 'cookbook-chart-config-guide',
  templateUrl: 'chart-config-guide.component.html',
})
export class ChartConfigGuideComponent {
  public guideChartHtml = `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`;
  public demoDataExample = `private ${ChartConfigExample.demoDataString}`;
  public chartProperties = `private _chart: Chart;`;
  public createChartFunctionExample = `private _chart: Chart;
public ngOnDestroy(): void {
   this._chart.destroy();
 }

private createChart() {
   let config = StockChartConfig.basicConfig;

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
