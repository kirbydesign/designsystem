import { AfterViewInit, Component } from '@angular/core';
import { Chart, Filler, ScatterDataPoint, Tooltip } from 'chart.js';
import { StockChartConfig } from '@kirbydesign/designsystem';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'cookbook-chart-example-config-stock',
  template: `<div style="position: relative; height: 300px;">
    <canvas id="{{ canvasId }}"></canvas>
  </div>`, // container must be position relative: https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
})
export class ChartExampleConfigStockComponent implements AfterViewInit {
  public canvasId = 'configStockCanvas';

  private _chart: Chart;
  private _stockChartConfig: StockChartConfig;
  private demoData: ScatterDataPoint[] = [
    { x: 1637049659000, y: 127.15 },
    { x: 1637049662000, y: 127.15 },
    { x: 1637049760000, y: 127.08 },
    { x: 1637049926000, y: 127.08 },
    { x: 1637050490000, y: 126.93 },
    { x: 1637050637000, y: 127.25 },
    { x: 1637050736000, y: 127.08 },
    { x: 1637050797000, y: 127.03 },
    { x: 1637050923000, y: 127.03 },
    { x: 1637051160000, y: 127.08 },
  ];

  public ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart() {
    this._stockChartConfig = new StockChartConfig();
    let config = this._stockChartConfig.getBasicConfig();

    config = {
      ...config,
      plugins: [
        annotationPlugin,
        Filler,
        ChartDataLabels,
        Tooltip,
        // MarkerPlugin
      ],
      options: {
        ...config.options,
        plugins: {
          tooltip: this._stockChartConfig.getTooltipPlugin(),
          datalabels: this._stockChartConfig.getDataLabelsPluginConfig(),
        },
      },
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
    this._chart = new Chart(this.canvasId, config);
  }
}
