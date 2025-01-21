import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { StockChartConfig } from '@kirbydesign/designsystem';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartConfigExample } from '../chart-config-example';

const config = {
  selector: 'cookbook-chart-example-config-stock',
  template: `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --> </canvas>
</div>`, // container must be positioned relative: https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
  codeSnippet: `
  private _chart: Chart;

  public ngAfterViewInit(): void {
    StockChartConfig.registerPlugins();
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = StockChartConfig.baseConfig;

    config = {
      ...config,
      plugins: [
        StockChartConfig.verticalLinePluginConfig,
        ChartDataLabels // 'chartjs-plugin-datalabels' package must be installed;
        ], 
      options: {
        ...config.options,
        plugins: {
          tooltip: StockChartConfig.tooltipPlugin,
          datalabels: StockChartConfig.dataLabelsPluginConfig,
        },
      },
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
  }`,
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
  private demoData = ChartConfigExample.demoData;

  public ngAfterViewInit(): void {
    StockChartConfig.registerPlugins();
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = StockChartConfig.baseConfig;

    config = {
      ...config,
      plugins: [StockChartConfig.verticalLinePluginConfig, ChartDataLabels],
      options: {
        ...config.options,
        plugins: {
          tooltip: StockChartConfig.tooltipPlugin,
          datalabels: StockChartConfig.dataLabelsPluginConfig,
        },
      },
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
  }
}
