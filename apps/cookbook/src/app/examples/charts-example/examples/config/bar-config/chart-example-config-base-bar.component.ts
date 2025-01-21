import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BarChartConfig } from '@kirbydesign/designsystem';
import { Chart } from 'chart.js';
import { ChartConfigExample } from '../chart-config-example';

const config = {
  selector: 'cookbook-chart-example-config-base-bar',
  template: `<div style="position: relative; height: 300px;">
  <canvas id="{{ canvasId }}"> <!-- Your accessible content here --> </canvas>
</div>`, // container must be positioned relative: https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
  codeSnippet: `private _chart: Chart;
  
public ngAfterViewInit(): void {
  this.createChart();
}

public ngOnDestroy(): void {
  this._chart.destroy();
}

private createChart() {
  let config = BarChartConfig.baseConfig;

  config = {
    ...config,
    options: {
      ...config.options,
    },
    data: {
      datasets: [
        {
          data: this.demoData,
        },
      ],
      labels: this.demoData.map((_) => ''),
    },
  };
  this._chart = new Chart(this.canvasId, config);
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleConfigBaseBarComponent implements AfterViewInit, OnDestroy {
  public template: string = config.template;
  public codeSnippet: string = config.codeSnippet;

  public canvasId = 'configBarBaseCanvas' + Math.random() * 1000; // necessary as duplicate ids are causing the chart not to be loaded when moving between guide and showcase where the same example is used

  private _chart: Chart;
  private demoData = ChartConfigExample.barDemoData;

  public ngAfterViewInit(): void {
    this.createChart();
  }

  public ngOnDestroy(): void {
    this._chart.destroy();
  }

  private createChart() {
    let config = BarChartConfig.baseConfig;

    config = {
      ...config,
      options: {
        ...config.options,
      },
      data: {
        datasets: [
          {
            data: this.demoData,
          },
        ],
        labels: this.demoData.map(() => ''),
      },
    };
    this._chart = new Chart(this.canvasId, config);
  }
}
