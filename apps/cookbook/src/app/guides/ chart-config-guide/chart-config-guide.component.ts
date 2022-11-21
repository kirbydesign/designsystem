import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-chart-config-guide',
  templateUrl: 'chart-config-guide.component.html',
})
export class ChartConfigGuideComponent {
  public guideChartHtml = `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`;
  public guideChartTs = [
    `
private _chart: Chart;
private _stockChartConfig: StockChartConfig;
    `,
    `
private demoData: ScatterDataPoint[] = [
    { x: 1, y: 127.15 },
    { x: 2, y: 127.15 },
    { x: 3, y: 127.08 },
    { x: 4, y: 127.08 },
    { x: 4, y: 126.93 },
    { x: 5, y: 127.25 }
  ];`,
    `
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
}
`,
    `
ngOnDestroy(): void {
  this._chart.destroy();
}`,
  ];
}
