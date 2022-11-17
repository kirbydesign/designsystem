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
    { x: 1368377918249, y: 401 },
    { x: 1668477933534, y: 32 },
    { x: 1668577933534, y: 98 },
    { x: 1668597933534, y: 8 },
    { x: 1668677933534, y: 552 },
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
