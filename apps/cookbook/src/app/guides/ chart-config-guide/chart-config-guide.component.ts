import { Component } from '@angular/core';
import { ChartConfigExample } from '~/app/examples/charts-example/examples/stock-config/chart-config-example';

@Component({
  selector: 'cookbook-chart-config-guide',
  templateUrl: 'chart-config-guide.component.html',
})
export class ChartConfigGuideComponent {
  public guideChartHtml = `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`;
  public demoDataExample = `private ${ChartConfigExample.demoDataString}`;
  public chartProperties = `private _chart: Chart;
private _stockChartConfig: StockChartConfig;`;
  public createChartFunctionExample = `
private createChart() {
  this._stockChartConfig = new StockChartConfig();
  let config = this._stockChartConfig.getBasicConfig();

  config = {
    ...config, <-- Remember to spread the existing config. If you don´t, the existing configurations will be lost
    data: {
      datasets: [
        {
          borderColor: '#005c3c',
          data: this.demoData.map((demoDataEntry) => demoDataEntry),
        },
      ],
      labels: this.demoData.map((demoDataEntry) => demoDataEntry.x),
    },
  };

  this._chart = new Chart('myId', config);
}`;

  public destroyExample = `ngOnDestroy(): void {
  this._chart.destroy();
}`;
}
