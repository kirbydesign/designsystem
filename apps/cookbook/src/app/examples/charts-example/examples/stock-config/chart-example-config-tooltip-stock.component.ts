import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { StockChartConfig } from '@kirbydesign/designsystem';
import { Chart } from 'chart.js';
import { ChartConfigExample } from './chart-config-example';

const config = {
  selector: 'cookbook-chart-example-config-tooltip-stock',
  template: `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"></canvas>
</div>`, // container must be positioned relative: https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
  codeSnippet: `
  private _chart: Chart;

  public ngAfterViewInit(): void {
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = StockChartConfig.basicConfig;

    config = {
      ...config,
      plugins: [StockChartConfig.verticalLinePluginConfig],
      options: {
        ...config.options,
        plugins: {
          tooltip: StockChartConfig.tooltipPlugin,
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
export class ChartExampleConfigTooltipStockComponent implements AfterViewInit, OnDestroy {
  public template: string = config.template;
  public codeSnippet: string = config.codeSnippet;

  public canvasId = 'configStockTooltipCanvas' + Math.random() * 1000; // nessesary as dublicate ids are causing the chart not to be loaded

  private _chart: Chart;
  private demoData = ChartConfigExample.demoData;

  public ngAfterViewInit(): void {
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = StockChartConfig.basicConfig;

    config = {
      ...config,
      plugins: [StockChartConfig.verticalLinePluginConfig],
      options: {
        ...config.options,
        plugins: {
          tooltip: StockChartConfig.tooltipPlugin,
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
