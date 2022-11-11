import { Component, OnInit } from '@angular/core';
import { ChartLocale } from '@kirbydesign/designsystem';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { toDate } from 'date-fns';
import { LineChartBuilder } from './line-chart-builder';

@Component({
  selector: 'cookbook-chart-example-line-builder',
  template: `<div>
    <canvas id="lineChartExample"></canvas>
  </div>`,
})
export class LineChartBuilderComponent implements OnInit {
  public chart: Chart;

  private lineChartBuilder: LineChartBuilder;

  constructor() {}

  private createChart() {
    this.lineChartBuilder = new LineChartBuilder();

    const chartData: ChartData = {
      labels: [1668164150325, 1668164156884, 1668164158565, 1668164159338, 1668164160944],
      datasets: [{ data: [32, 22, 11, 56, 44] }],
    };

    const stockOptions = getStockChartOptions('da-DK');
    const defaultOptions = this.lineChartBuilder.getOptions();
    const options: ChartOptions = {
      ...stockOptions,
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
/**
 * Stolen code
 */

function getStockChartOptions(locale: ChartLocale) {
  return {
    locale: locale,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const date = toDate((tooltipItems[0]?.raw as any)?.x);
            if (date.valueOf()) {
              return date.toLocaleTimeString(locale, {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });
            }
          },
          label: (context) => {
            // It's not possible to add spacing between color legend and text so we
            // prefix with a space.
            return ' ' + context.formattedValue + ('suffix' || '');
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return value + ('suffix' || '');
          },
        },
      },
    },
  };
}
