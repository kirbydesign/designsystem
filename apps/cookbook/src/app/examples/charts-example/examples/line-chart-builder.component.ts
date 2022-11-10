import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { LineChartBuilder } from './line-chart-builder';

@Component({
  selector: 'cookbook-chart-example-line-builder',
  template: `<div>
    <canvas id="lineChartExample">{{ chart }}</canvas>
  </div>`,
})
export class LineChartBuilderComponent implements OnInit {
  @ViewChild('lineChartExample') public lineChart: HTMLElement;
  public chart: Chart;

  private lineChartBuilder: LineChartBuilder;

  constructor() {}
  private createChart() {
    this.lineChartBuilder = new LineChartBuilder();

    const chartData: ChartData = {
      labels: [...'KIRBY'],
      datasets: [{ label: 'a', data: [1, 2, 4, 3, 1] }],
    };

    const options: ChartOptions = {
      aspectRatio: 1,
      backgroundColor: 'rgb(255,0,0)',
      plugins: {
        tooltip: this.lineChartBuilder.getKirbyToolTip(),
      },
    };

    const config = this.lineChartBuilder.data(chartData).options(options).build();

    this.chart = new Chart('lineChartExample', config);
  }

  ngOnInit(): void {
    this.createChart();
  }
}
