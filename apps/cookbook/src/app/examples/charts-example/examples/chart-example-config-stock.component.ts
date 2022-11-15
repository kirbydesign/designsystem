import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';
import { StockChartConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-chart-example-config-stock',
  template: `<canvas id="{{ canvasId }}"></canvas>`,
})
export class ChartExampleConfigStockComponent implements AfterViewInit {
  public canvasId = 'configStockCanvas';

  private _chart: Chart;
  private _stockChartConfig: StockChartConfig;
  private demoData: { yValue: number; label: string }[] = [
    { yValue: 12, label: 'K' },
    { yValue: 1, label: 'I' },
    { yValue: 13, label: 'R' },
    { yValue: 5, label: 'B' },
    { yValue: 6, label: 'Y' },
  ];

  public ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart() {
    this._stockChartConfig = new StockChartConfig();
    let config = this._stockChartConfig.getBasicConfig();

    config = {
      ...config,
      options: {
        ...config.options,
        plugins: {
          tooltip: this._stockChartConfig.getTooltipPlugin(),
        },
      },
      data: {
        datasets: [
          {
            data: this.demoData.map((demoDataEntry) => demoDataEntry.yValue),
          },
        ],
        labels: this.demoData.map((demoDataEntry) => demoDataEntry.label),
      },
    };

    this._chart = new Chart(this.canvasId, config);
  }
}
