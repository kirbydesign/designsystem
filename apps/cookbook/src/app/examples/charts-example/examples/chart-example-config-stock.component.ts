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
  private demoData: { value: ScatterDataPoint; label: string }[] = [
    { value: { x: 1, y: 19 }, label: 'K' },
    { value: { x: 2, y: 252 }, label: 'I' },
    { value: { x: 3, y: 13 }, label: 'R' },
    { value: { x: 4, y: 282 }, label: 'B' },
    { value: { x: 5, y: 45 }, label: 'Y' },
    { value: { x: 6, y: 15 }, label: '_' },
    { value: { x: 7, y: 67 }, label: 'T' },
    { value: { x: 8, y: 325 }, label: 'E' },
    { value: { x: 9, y: 89 }, label: 'A' },
    { value: { x: 10, y: 43 }, label: 'M' },
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
            data: this.demoData.map((demoDataEntry) => demoDataEntry.value),
          },
        ],
        labels: this.demoData.map((demoDataEntry) => demoDataEntry.label),
      },
    };
    this._chart = new Chart(this.canvasId, config);
  }
}
