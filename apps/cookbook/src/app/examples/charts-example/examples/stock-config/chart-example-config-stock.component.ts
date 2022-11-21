import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { StockChartConfig } from '@kirbydesign/designsystem';
import { ChartConfigExample } from './chart-config-example';

const config = {
  selector: 'cookbook-chart-example-config-stock',
  template: `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`, // container must be positioned relative: https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
  codeSnippet: `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleConfigStockComponent implements AfterViewInit, OnDestroy {
  public template: string = config.template;
  public codeSnippet: string = config.codeSnippet;

  public canvasId = 'configStockCanvas';

  private _chart: Chart;
  private _stockChartConfig: StockChartConfig;
  private demoData = ChartConfigExample.demoData;

  public ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    this._stockChartConfig = new StockChartConfig();
    let config = this._stockChartConfig.getBasicConfig();

    config = {
      ...config,
      plugins: [this._stockChartConfig.getVerticalLinePluginConfig()],
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
